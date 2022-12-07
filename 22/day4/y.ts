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

    if(elf1.from < elf2.from) {
        if ((elf1.to > elf2.from) || (elf1.to === elf2.from)){
            return 1
        }else {
            return 0
        }
    }
    else if(elf2.from < elf1.from) {
        if ((elf2.to > elf1.from) || (elf2.to === elf1.from)){
            return 1
        }else {
            return 0
        }
    }
    else return 1
}

const containsOverlap = data
    .map(row => convertRowToPair(row))
    .map(pair => checkOverlap(pair))
    .reduce((t, e) => t + e)


console.log(containsOverlap);