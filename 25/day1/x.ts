import { readFileSync } from "fs";

let input: string = readFileSync('input.txt', 'utf8');
let instructions = input.split('\n');
let start = 50;

type Rotation = {
    direction: string
    distance: number
}

// Keep track of start
// count zeros

// split instruction
// loop through instruction
//  - parse instruction
//  - rotate
//  - count trues

const password = instructions
    .map(parseRotation)
    .map(rotate)
    .reduce((acc, curr) => {
        return curr ? ++acc : acc
    }, 0)

console.log(password)

function parseRotation(instruction: string) {
    return {
        direction: instruction[0],
        distance: Number(instruction.slice(1)),
    } as Rotation
}

function rotate({ direction, distance }: Rotation) {
    if (direction === "R") {
        start = (start + distance) % 100
    } else {
        start = (start - distance + 100) % 100
    }

    return start === 0
}