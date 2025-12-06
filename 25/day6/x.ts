import { readFileSync } from "fs";

let input: string = readFileSync('input.txt', 'utf-8')
let worksheet = input
    .split('\n')
    .map((row) => {
        const regex = /\s+/g;
        return row.trim().replaceAll(regex, "\s").split("\s")
    })

let sum = worksheet[worksheet.length - 1]
    .map((operation, index) => {
        let operands: number[] = []

        worksheet.forEach((row, rowIndex) => {
            if (rowIndex < worksheet.length - 1) {
                operands.push(+row[index])
            }
        })

        return operation === "+" ? add(operands) : multiply(operands)
    })
    .reduce((acc, curr) => acc + curr, 0)

console.log(sum)

function add(operands: number[]): number {
    if (operands.length == 2) {
        return operands[0] + operands[1]
    }

    return operands[0] + add(operands.slice(1))
}

function multiply(operands: number[]): number {
    if (operands.length == 2) {
        return operands[0] * operands[1]
    }

    return operands[0] * multiply(operands.slice(1))
}