export const x = '';

import { readFileSync } from 'fs';

interface IRucksack {
    c1: string;
    c2: string;
}

const input: string = readFileSync('input.txt', 'utf8');

let data = input.split('\r\n');

const itemsArray: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

function itemToPriority(item: string): number{
    return itemsArray.indexOf(item) + 1
}

function appearsInBoth(rucksack: IRucksack): string{
    const { c1, c2 } = rucksack
    const commonItem = Array.from(c1).find(x => c2.indexOf(x) > -1)
    return commonItem ? commonItem : ''
}

function divideRucksack(rucksack: string): IRucksack{ 
    let halfRucksackLength = rucksack.length / 2
    return { 
        c1: rucksack.slice(0, halfRucksackLength), 
        c2: rucksack.slice(halfRucksackLength) 
    } 
}

const totalPriority = data
    .map(rucksack => divideRucksack(rucksack))
    .map(rucksack => appearsInBoth(rucksack))
    .map(commonItem => itemToPriority(commonItem))
    .reduce((t, e) => t + e)

console.log(totalPriority)
