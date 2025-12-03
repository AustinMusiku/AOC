import { readFileSync } from "fs";

let input: string = readFileSync('input.txt', 'utf-8')
let banks = input.split('\n')

let sum = banks
    .map(getJoltage)
    .reduce((acc, curr) => acc + curr)

console.log(sum)

function getJoltage(bank: string) {
    let max: number = 0

    for (let i = 0; i < bank.length; i++) {
        for (let j = 0; j < bank.length; j++) {
            if (i >= j) {
                continue
            }

            let curr = Number([bank[i], bank[j]].join(""))
            if (curr > max) {
                max = curr
            }
        }
    }

    return max
}