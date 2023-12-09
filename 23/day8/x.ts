import { readFileSync } from 'fs';
import path from 'path';

type Node = {
    L: string,
    R: string,
}

type Network = {
    [key: string]: Node
}

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const [ instructions , _, ...nodes ] = data.split('\r\n')

let network = nodes.reduce(nodify, {} as Network)

let counter = 0
let current = 'AAA'

while (current !== 'ZZZ') {
    let step = instructions[counter % instructions.length]
    let { L, R } = network[current]
    current = step === 'L' ? L : R
    counter++
}

console.log(counter)

function nodify(acc: Network, row: string) {
    let [ key, steps ] = row.split(' = ')
    let [ L, R ] = steps.slice(1, steps.length-1).split(', ')

    return {
        ...acc,
        [key]: { L, R }
    } as Network
}