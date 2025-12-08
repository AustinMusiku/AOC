import { readFileSync } from "fs";

type Coordinate = {
    x: number, // column
    y: number // row
}

let input: string = readFileSync('input.txt', 'utf-8')
let manifoldMap = input
    .split("\n")
    .map(row => row.split(""))

let start: Coordinate = { x: manifoldMap[0].indexOf("S"), y: 0 }

const memo = new Map<string, number>()

let paths = traverse(start)

console.log(paths)

function traverse(start: Coordinate) {
    if (manifoldMap[start.y] === undefined || manifoldMap[0][start.x] === undefined) {
        return 1
    }

    if (memo.has(stringify(start))) {
        return memo.get(stringify(start)) as number
    }

    let totalDepth = 0

    if (manifoldMap[start.y][start.x] === "^") {
        // explore right
        let right: Coordinate = { x: start.x + 1, y: start.y }
        totalDepth += traverse(right)

        // explore left
        let left: Coordinate = { x: start.x - 1, y: start.y }
        totalDepth += traverse(left)
    } else {
        // explore down
        let down: Coordinate = { x: start.x, y: start.y + 1 }
        totalDepth += traverse(down)
    }

    memo.set(stringify(start), totalDepth)
    return totalDepth
}

function stringify(coordinate: Coordinate) {
    return `${coordinate.x}:${coordinate.y}`
}