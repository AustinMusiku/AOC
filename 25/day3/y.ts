import { readFileSync } from "fs";

let input: string = readFileSync('input.txt', 'utf-8')
let banks = input.split('\n')

let sum = banks
    .map(getJoltage)
    .reduce((acc, curr) => acc + curr)

console.log(sum)

function getJoltage(bank: string) {
    const requiredBatteries = 12
    let joltage: number[] = []
    let start = 0

    while (joltage.length < requiredBatteries) {
        // define window
        let stop = bank.length - (requiredBatteries - joltage.length)

        let maxCandidateValue = 0, maxCandidateIdx = 0
        for (let i = start; i <= stop; i++) {
            if (+bank[i] > maxCandidateValue) {
                maxCandidateValue = +bank[i]
                maxCandidateIdx = i

                if (maxCandidateValue === 9) break;
            }
        }

        // select max
        joltage.push(maxCandidateValue)

        // update window
        start = maxCandidateIdx + 1
    }

    return +joltage.join("")
}