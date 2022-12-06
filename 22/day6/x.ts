export const x = '';

import { readFileSync } from 'fs';

const input: string = readFileSync('input.txt', 'utf8');

const data: string[] = input.split('');

const buffer: string[] = []
const MARKER_SIZE: number = 4

let isFound = false
let start: number = 0

function checkForPacketMarker(char: string): void{
    buffer.push(char)
    
    if(buffer.length > MARKER_SIZE) buffer.shift()
    
    const bufferSet: Set<string> = new Set(buffer)

    if(bufferSet.size === MARKER_SIZE) isFound = true
}

for(let char of data) {
    if(isFound) break
    start++
    checkForPacketMarker(char)
}

console.log(start)