export const x = '';

import { readFileSync } from 'fs';

const input: string = readFileSync('input.txt', 'utf8');

let data: string[] = input.split('\r\n');

const itemsArray: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
let groupsMap = new Map<string, string[]>()
let commonItems: string[] = []

function itemToPriority(item: string): number{
    return itemsArray.indexOf(item) + 1
}

function findCommonItem(group: string[]): string{
    const [ c1, c2, c3 ] = group
    const commonItem = Array.from(c1).find(x => c2.indexOf(x) > -1 && c3.indexOf(x) > -1)
    return commonItem ? commonItem : ''
}

function divideIntoGroups(data: string[]): void {
    groupsMap.set(`group${groupsMap.size + 1}`, data.slice(0, 3))
    if(data.length > 3) divideIntoGroups(data.slice(3));
}


divideIntoGroups(data)

groupsMap
    .forEach(group => commonItems.push(findCommonItem(group)))

let sumCommonItems = commonItems
    .map(commonItem => itemToPriority(commonItem))
    .reduce((t, e) => t + e)

console.log(sumCommonItems)