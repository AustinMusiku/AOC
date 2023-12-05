import { readFileSync } from 'fs';
import path from 'path';

type Gear = {
    gearRatio: number,
    row: number,
    column: number,
    isValid: boolean
}

const digits = ['0','1','2','3','4','5','6','7','8','9']

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const graph = data.split('\r\n')

const gears = graph
    .map(listGears)
    .flat()
    .filter(gear => gear.isValid)
    .reduce((acc, { gearRatio }) => acc + gearRatio, 0)

console.log(gears)

function listGears(row: string, rIdx: number) {
    let gears: Gear[] = []
    let chars = row.split('')

    chars.forEach((char, cIdx) => {
        if(char === '*'){
            let gear: Gear = {
                gearRatio: 0,
                row: rIdx,
                column: cIdx,
                isValid: false
            }

            toggleGearValidity(gear)

            gears.push(gear)
        }
    })

    return gears
}

function toggleGearValidity(gear: Gear): boolean {
    let adjacentParts: string[] = []
    let [rIdx, cIdx] = [gear.row, gear.column]

    // checkTop - graph[row-1][column-1:column+1]
    if(rIdx > 0){
        adjacentParts.push(...pickAdjacentParts(graph[rIdx-1], cIdx-1, cIdx+1))
    }
    // check right - graph[row][column+1]
    if(cIdx < graph[rIdx].length-1){
        adjacentParts.push(...pickAdjacentParts(graph[rIdx], cIdx+1, cIdx+1))
    }
    // check bottom - graph[row+1][column-1:column+1]
    if(rIdx < graph.length-1){
        adjacentParts.push(...pickAdjacentParts(graph[rIdx+1], cIdx-1, cIdx+1))
    }
    // check left - graph[row][column-1]
    if(cIdx > 0){
        adjacentParts.push(...pickAdjacentParts(graph[rIdx], cIdx-1, cIdx))
    }

    if(adjacentParts.length !== 2) { return false }

    gear.isValid = true
    gear.gearRatio = Number(adjacentParts[0]) * Number(adjacentParts[1])
    
    return true
}

function pickAdjacentParts(row: string, first: number, last: number) {
    let firstPart = ''
    let secondPart = ''
    let buffer: string[] = []
    let start = first<1 ? 0: expandLeft(row, first)
    let stop = last===row.length-1 ? last: expandRight(row, last)

    for(let i=start;i<=stop;i++){
        if(digits.includes(row[i])){
            buffer.push(row[i])

            if(i === stop){
                if(firstPart === ''){
                    firstPart = buffer.join('')
                    buffer = []
                } else {
                    secondPart = buffer.join('')
                    buffer = []
                }
            }
        } else {
            if(firstPart === ''){
                firstPart = buffer.join('')
                buffer = []
            } else {
                secondPart = buffer.join('')
                buffer = []
            }
        }
    }

    function expandLeft(row:string, first: number) {
        let start = first

        for(let i=0;i<3;i++){
            if (!digits.includes(row[first-i]) || start===0 ) return start
            start--  
        }

        return start
    }

    function expandRight(row:string, last: number) {
        let stop = last

        for(let i=0;i<3;i++){
            if (!digits.includes(row[last+i]) || stop===row.length-1 ) return stop
            stop++  
        }

        return stop
    }

    return [firstPart, secondPart].filter(part => part != '')
}