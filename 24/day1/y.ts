import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(calculateSimilarityScore)
    .then(console.log)

function calculateSimilarityScore(rawData: string){
    let lines = rawData.split("\r\n")
    
    let pairs = lines
        .reduce((acc: {left: number[], right: number[]}, current) => {
            let [left, right] = current.split("  ")

            acc.left.push(parseInt(left))
            acc.right.push(parseInt(right))

            return acc
        }, {left: [], right: []})


    return pairs.left
        .map(current => current*countAppearances(pairs.right, current))
        .reduce((acc, current) => acc+current, 0)
}

function countAppearances(list: number[], target: number) {
    let count = 0
    for (let i=0; i<list.length; i++){
        if (list[i]==target){
            count++
        }
    }    
    return count
}