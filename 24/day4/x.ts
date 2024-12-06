import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(prepareWordMap)
    .then(findWords)
    .then(console.log)

function prepareWordMap(rawMap: string) {
    return rawMap
        .split("\r\n")
        .map(row => row.split(""))
}

function findWords(wordmap: string[][]) {
    let count = 0
    
    function check(direction: number, position: { rowIdx: number, colIdx: number }) {
        let {rowIdx, colIdx} = position
        let width = wordmap[0].length
        let height = wordmap.length
        let candidateElements: string[] = []
        
        switch (direction) {
            case 1:
                if(position.rowIdx > 2){
                    for (let index = 0; index < 4; index++) {
                        candidateElements.push(wordmap[rowIdx-index][colIdx]);
                    }
                }
                break;
            case 2:
                if(position.rowIdx > 2 && position.colIdx < width-3){
                    for (let index = 0; index < 4; index++) {
                        candidateElements.push(wordmap[rowIdx-index][colIdx+index]);   
                    }
                }
                break;
            case 3:
                if(position.colIdx < width-3){
                    for (let index = 0; index < 4; index++) {
                        candidateElements.push(wordmap[rowIdx][colIdx+index]);   
                    }
                }
                break;
            case 4:
                if(position.rowIdx < height-3 && position.colIdx < width-3){
                    for (let index = 0; index < 4; index++) {
                        candidateElements.push(wordmap[rowIdx+index][colIdx+index]);   
                    }
                }
                break;
            case 5:
                if(position.rowIdx < height-3){
                    for (let index = 0; index < 4; index++) {
                        candidateElements.push(wordmap[rowIdx+index][colIdx]);   
                    }
                }
                break;
            case 6:
                if(position.rowIdx < height-3 && position.colIdx > 2){
                    for (let index = 0; index < 4; index++) {
                        candidateElements.push(wordmap[rowIdx+index][colIdx-index]);   
                    }
                }
                break;
            case 7:
                if(position.colIdx > 2){
                    for (let index = 0; index < 4; index++) {
                        candidateElements.push(wordmap[rowIdx][colIdx-index]);   
                    }
                }
                break;
            case 8:
                if(position.rowIdx > 2 && position.colIdx > 2){
                    for (let index = 0; index < 4; index++) {
                        candidateElements.push(wordmap[rowIdx-index][colIdx-index]);   
                    }
                }
                break;
        }

        let candidate = candidateElements.join("")
        console.log(candidate)
        if(candidate === "XMAS"){
            count += 1
        }
    }
    
    wordmap.forEach((row, rowIdx) => {
        row.forEach((_, colIdx) => {
            for (let direction = 1; direction < 9; direction++) {
                check(direction, { rowIdx, colIdx })
            }
        })
    });

    return count
}

    