import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(prepareManual)
    .then(aggregatePages)
    .then(console.log)

type Rules = {[key: number]: number[]}
type Manual = {rules: Rules, pageLists: number[][]}

function prepareManual(data: string) {
    let manual: Manual = {rules: {}, pageLists: []}
    let rawManual = data
        .split("\r\n\r\n")

    rawManual[0]
        .split("\r\n")
        .map(rule => rule.split("|").map(d => parseInt(d)))
        .forEach(rule => {
            if(!manual.rules[rule[0]]){
                manual.rules[rule[0]] = []
            }
            manual.rules[rule[0]].push(rule[1])
        });

    rawManual[1]
        .split("\r\n")
        .forEach(pages => {
            manual.pageLists.push(pages.split(",").map(d => parseInt(d)))
        })

    return manual
}

function aggregatePages(manual: Manual) {
    return manual.pageLists
        .map(pageList => {
            let sortedList = sortList(pageList, manual.rules)
            
            if(pageList.join("") === sortedList.join("")){
                return sortedList[Math.floor(sortedList.length/2)]
            }
            
            return 0
        })
        .reduce((acc, mid) => acc+mid, 0)
}

function sortList(list: number[], rules: Rules) {
    let sortedList = list.slice(0)

    for (let i = 0; i < sortedList.length-1; i++) {
        for (let j = 0; j < sortedList.length-i-1; j++) {
            if(!rules[sortedList[j]].includes(sortedList[j+1])){
                let temp = 0;
                temp = sortedList[j];
                sortedList[j] = sortedList[j+1];
                sortedList[j+1] = temp;
            }
        }
    }

    return sortedList
}


