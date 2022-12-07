import { readFileSync } from 'fs';

const input: string = readFileSync('input.txt', 'utf8');

let data: string[] = input.split('\r\n');

let elfLists: number[][] = [];

function extractFirstList(array: string[], i: number){
    let elfList: number[] = array
        .slice(0, i)
        .map((e: string) => parseInt(e))
        
    elfLists.push(elfList);    
    array = array.slice(i+1);
    let idx = array.indexOf('');
    if(idx > -1) extractFirstList(array, idx);
}

extractFirstList(data, data.indexOf(''));

let reducedElfLists = elfLists
    .map(elfList => elfList.reduce((a: number, b: number) => a + b))
    .sort((a: number, b: number) => b - a);

let max = reducedElfLists[0];

console.log(max);