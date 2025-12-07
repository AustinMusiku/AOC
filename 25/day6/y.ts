import { readFileSync } from "fs";

let input: string = readFileSync('input.txt', 'utf-8')
let worksheet = input
    .split('\n')
    .map(row => row.split(""))

let total = 0
let operands: number[] = []

for (let i = worksheet[0].length - 1; i > -1; i--) {
    let operand: string[] = []
    let operator: string = ""

    worksheet.forEach((row => {
        if (row[i] === "+" || row[i] === "*") {
            operator = row[i]
        } else {
            operand.push(row[i])
        }
    }))

    if (operand.every(character => character === " ")) {
        continue
    }

    operands.push(+operand.join("").replaceAll(/\s+/g, ""))

    if (operator !== "") {
        total += operator === "+" ? add(operands) : multiply(operands)
        operands = []
    }
}

console.log(total)

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