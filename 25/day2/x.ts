import { readFileSync } from "fs";

let input: string = readFileSync('input.txt', 'utf-8');
let ranges = input.split(',')

let sum = ranges
    .map(parseRange)
    .map(checkRange)
    .reduce((acc, curr) => acc + curr)

console.log(sum)

function parseRange(range: string) {
    return range.split('-').map(Number)
}

function checkRange([start, end]: number[]) {
    let sum = 0

    for (let i = start; i <= end; i++) {
        if (isInvalid(`${i}`)) {
            sum = sum + i
        }
    }

    return sum
}


function isInvalid(productId: string) {
    let len = productId.length

    for (let i = 0; i < len / 2; i++) {
        if (productId[i] !== productId[(len / 2) + i]) {
            return false
        }
    }

    return true
}