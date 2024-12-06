import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(prepareWordMap)
    .then(findX)
    .then(console.log)

function prepareWordMap(rawMap: string) {
    return rawMap
        .split("\r\n")
        .map(row => row.split(""))
}

function findX(wordmap: string[][]) {
    let count = 0
    
    function check(rowIdx: number, colIdx: number) {
        // no need to check if the center of the X isn't an "A" 
        if(wordmap[rowIdx][colIdx] !== "A"){
            return
        }

        let width = wordmap[0].length
        let height = wordmap.length
        
        // no need to check if the center of the X lies on the edge of the wordmap 
        if(rowIdx < 1 || rowIdx > height-2 || colIdx < 1 || colIdx > width-2){
            return
        }

        if(
            (wordmap[rowIdx-1][colIdx-1] === "M" && wordmap[rowIdx+1][colIdx+1] === "S") || 
            (wordmap[rowIdx-1][colIdx-1] === "S" && wordmap[rowIdx+1][colIdx+1] === "M")
        ) {
            if(
                (wordmap[rowIdx-1][colIdx+1] === "M" && wordmap[rowIdx+1][colIdx-1] === "S") || 
                (wordmap[rowIdx-1][colIdx+1] === "S" && wordmap[rowIdx+1][colIdx-1] === "M")
            ) {
                count += 1
            }
        }
    }
    
    wordmap.forEach((row, rowIdx) => {
        row.forEach((_, colIdx) => {
            check(rowIdx, colIdx)
        })
    });

    return count
}

    