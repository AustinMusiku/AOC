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
    .reduce((acc, curr) => acc + curr)

console.log(password)

function parseRotation(instruction: string) {
    return {
        direction: instruction[0],
        distance: Number(instruction.slice(1)),
    } as Rotation
}

function rotate({ direction, distance }: Rotation) {
    let clicksAtZero = 0
    if (direction === "R") {
        for (let i = 0; i < distance; i++) {
            start = (start + 1) % 100
            if (start === 0) {
                clicksAtZero += 1
            }
        }
    } else {
        for (let i = 0; i < distance; i++) {
            start = (start - 1 + 100) % 100
            if (start === 0) {
                clicksAtZero += 1
            }
        }
    }

    return clicksAtZero
}