export const x = '';

import { readFileSync } from 'fs';

const input: string = readFileSync('input.txt', 'utf8');

let data = input.split('\r\n');

interface IElf {
    from: number;
    to: number;
}

interface IPair {
    elf1: IElf;
    elf2: IElf;
}

function convertRowToPair(row: string): IPair {
    let pair = row.split(',')
    let elf1 = pair[0].split('-')
    let elf2 = pair[1].split('-')
    return {
        elf1: { from: parseInt(elf1[0]), to: parseInt(elf1[1]) },
        elf2: { from: parseInt(elf2[0]), to: parseInt(elf2[1]) }
    }
}

function checkOverlap(pair: IPair): number {
    let { elf1, elf2 } = pair
    let arr1: number[] = []
    let arr2: number[] = []

    for(let i=elf1.from; i<=elf1.to; i++ ) arr1.push(i);
    for(let i=elf2.from; i<=elf2.to; i++ ) arr2.push(i);

    let arrSet = new Set<number>([...arr1, ...arr2])

    return arrSet.size < (arr1.length + arr2.length) ? 1 : 0
}

const containsOverlap = data
    .map(row => convertRowToPair(row))
    .map(pair => checkOverlap(pair))
    .reduce((t, e) => t + e)


console.log(containsOverlap);