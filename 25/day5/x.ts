import { readFileSync } from "fs";

let input: string = readFileSync('input.txt', 'utf-8')
let [rawFreshRanges, rawIngredientIds] = input.split("\n\n")

let freshRanges = rawFreshRanges
    .split("\n")
    .map(parseFreshRange)

let count = rawIngredientIds
    .split("\n")
    .map(checkIsFresh)
    .filter((id) => id)
    .length

console.log(count)

function checkIsFresh(ingredientId: string) {
    let isFresh = false

    for (let i = 0; i < freshRanges.length; i++) {
        let [first, last] = freshRanges[i]
        let id = +ingredientId

        if (id > first - 1 && id < last + 1) {
            isFresh = true
            break
        }
    }

    return isFresh
}

function parseFreshRange(rawFreshRange: string) {
    let [first, last] = rawFreshRange.split("-")
    return [+first, +last]
}