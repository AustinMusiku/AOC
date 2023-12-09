import { readFileSync } from 'fs';
import path from 'path';

// This is the brute force solution and it's far from optimal as per the day 8 solutions'
// reddit thread, but it works; only after a couple of hours(possibly days) of running.
// The correct solution is to find the steps to the end for each node, and then find the LCM.

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
let paths = Object.keys(network)
    .filter(key => endsWith('A', key))

console.log(paths)

while (!paths.every(path => endsWith('Z', path))) {
    const step = instructions[counter % instructions.length]
    
    paths = paths.map((path) => {
        let { L, R } = network[path]
        return step === 'L' ? L : R
    })

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

function endsWith(char: string, name: string){
    return name[name.length-1] === char
}