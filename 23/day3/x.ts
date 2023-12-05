import { readFileSync } from 'fs';
import path from 'path';

type Part = {
    num: string,
    row: number,
    columnStart: number,
    columnEnd: number,
    isValid: boolean
}

const digits = ['0','1','2','3','4','5','6','7','8','9']

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const graph = data.split('\r\n')

const parts = graph
    .map(listParts)
    .flat()
    .filter(part => part.isValid)
    .reduce((acc, part) => acc + Number(part.num), 0)

console.log(parts)

function listParts(row: string, rIdx: number ) {
    let parts: Part[] = []
    let buffer: string[] = []
    let chars = row.split('')

    chars.forEach((char, cIdx) => {
        let isDigit = digits.includes(char)

        if(isDigit){
            buffer.push(char)

            if(cIdx === chars.length - 1){
                parts.push({
                    num: buffer.join(''),
                    row: rIdx,
                    columnStart: (cIdx + 1) - buffer.length,
                    columnEnd: cIdx,
                    isValid: isValidPart(rIdx, (cIdx + 1) - buffer.length, cIdx)
                })
                buffer = []
            }
        } else {
            if(buffer.length > 0){
                parts.push({
                    num: buffer.join(''),
                    row: rIdx,
                    columnStart: cIdx - buffer.length,
                    columnEnd: cIdx - 1,
                    isValid: isValidPart(rIdx, cIdx - buffer.length, cIdx - 1)
                })
                buffer = []
            }
        }
    })

    return parts
}


function isValidPart(row: number, colStart: number, colEnd: number): boolean {
    // check top(row-1, slice(colStart-1:colEnd+2))
    if(row > 0){
        if(graph[row-1].slice((colStart===0? colStart: colStart-1), colEnd+2).split('').some(filterValidPart)){  return true }
    }

    // check right(row, colEnd+1)
    if(colEnd < graph[row].length - 1) {
        if(filterValidPart(graph[row][colEnd+1])) {  return true }
    }

    // check bottom(row+1, slice(colStart-1:colEnd+2))
    if(row < graph.length - 1){
        if(graph[row+1].slice((colStart===0? colStart: colStart-1), colEnd+2).split('').some(filterValidPart)) {  return true }
    }

    // check left(row, colStart-1)
    if(colStart > 0){
        if(filterValidPart(graph[row][colStart-1])) { return true }
    }

    return false
}

function filterValidPart(char: string) {
    // return true if char is not a digit or a dot - meaning it is a symbol.
    return ![...digits, '.'].includes(char)
}