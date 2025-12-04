import { readFileSync } from "fs";

let input: string = readFileSync('input.txt', 'utf-8')
let floor = input.split("\n").map((row) => row.split('')).flat()

const rowLength = 139
let removed = 0
let accessible: number[] = []

floor
    .forEach(checkNeighbours)

while (accessible.length > 0) {
    floor = floor.map(removeRoll)
    removed += accessible.length
    accessible = []
    floor.forEach(checkNeighbours)
}

console.log(removed)

function removeRoll(curr: string, index: number, floor: string[]) {
    return accessible.includes(index) ? "." : curr
}

function checkNeighbours(curr: string, index: number, floor: string[]) {
    let neighbours = 0

    function isLeftEdge() {
        return index % rowLength === 0
    }
    function isTopEdge() {
        return index < rowLength
    }
    function isRightEdge() {
        return index % rowLength === rowLength - 1
    }
    function isBottomEdge() {
        return index >= floor.length - rowLength
    }

    // check top (TL, T, TR)
    if (!isTopEdge() && !isLeftEdge() && floor[index - rowLength - 1] === "@") {
        neighbours += 1
    }
    if (!isTopEdge() && floor[index - rowLength] === "@") {
        neighbours += 1
    }
    if (!isTopEdge() && !isRightEdge() && floor[index - rowLength + 1] === "@") {
        neighbours += 1
    }

    // check sides (L & R)
    if (!isLeftEdge() && floor[index - 1] === "@") {
        neighbours += 1
    }

    if (!isRightEdge() && floor[index + 1] === "@") {
        neighbours += 1
    }

    // check bottom (BL, B, BR)
    if (!isBottomEdge() && !isLeftEdge() && floor[index + rowLength - 1] === "@") {
        neighbours += 1
    }
    if (!isBottomEdge() && floor[index + rowLength] === "@") {
        neighbours += 1
    }
    if (!isBottomEdge() && !isRightEdge() && floor[index + rowLength + 1] === "@") {
        neighbours += 1
    }

    if (curr === "@" && neighbours < 4) {
        accessible.push(index)
    }
}