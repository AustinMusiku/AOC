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
let stack: Coordinate[] = [start]

const path = new Set<string>([stringify(start)])
const splitters = new Set<string>()

while (stack.length > 0) {
    let curr = stack.pop() as Coordinate
    traverse(curr)
}

console.log(splitters.size)

function traverse(start: Coordinate) {
    if (manifoldMap[start.y] === undefined || manifoldMap[0][start.x] === undefined) {
        return
    }

    if (manifoldMap[start.y][start.x] === "^" && !splitters.has(stringify(start))) {
        splitters.add(stringify(start))

        let left: Coordinate = { x: start.x - 1, y: start.y }
        let right: Coordinate = { x: start.x + 1, y: start.y }

        // enqueue right
        if (!path.has(stringify(right))) {
            stack.push(right)
            path.add(stringify(right))
        }

        // enqueue left
        if (!path.has(stringify(left))) {
            stack.push(left)
            path.add(stringify(left))
        }
    } else {
        let down: Coordinate = { x: start.x, y: start.y + 1 }
        if (!path.has(stringify(down))) {
            stack.push(down)
            path.add(stringify(down))
        }
    }

}

function stringify(coordinate: Coordinate) {
    return `${coordinate.x}:${coordinate.y}`
}