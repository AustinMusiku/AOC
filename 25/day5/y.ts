import { readFileSync } from "fs";

let input: string = readFileSync('input.txt', 'utf-8')
let [rawFreshRanges, _] = input.split("\n\n").map((arr) => arr.split("\n"))

let sortedRanges = rawFreshRanges
    .map(parseFreshRange)
    .sort((a, b) => a[0] - b[0])

let count = mergeRanges(sortedRanges)
    .map(([first, last]) => last - first + 1)
    .reduce((acc, curr) => acc + curr, 0)

console.log(count)

function mergeRanges(sortedRanges: number[][]) {
    let head = 0, tail = head + 1

    while (tail < sortedRanges.length) {
        if (sortedRanges[head][1] >= sortedRanges[tail][0]) {
            sortedRanges[head][1] = sortedRanges[tail][1] > sortedRanges[head][1] ? sortedRanges[tail][1] : sortedRanges[head][1]
            sortedRanges.splice(tail, 1)
        } else {
            tail += 1
            head += 1
        }
    }

    return sortedRanges
}

function parseFreshRange(rawFreshRange: string) {
    let [first, last] = rawFreshRange.split("-")
    return [+first, +last]
}