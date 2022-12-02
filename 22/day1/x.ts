export const x = '';

import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');

let data = input.split(/\n\s*\n/);

let reducedElfLists = data.map(elf => {
    let elfListSum = elf
        .trimEnd()
        .split(/\s+/)
        .map(t => parseInt(t))
        .reduce((a, b) => a + b);
        
    return elfListSum;
});

let max = reducedElfLists.sort((a, b) => b - a)[0];

console.log(max);