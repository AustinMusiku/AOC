import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(readInstructions)
    .then(aggregateInstructions)
    .then(console.log)

function readInstructions(memoryDump: string) {
    let instructionExp = /mul\((\d{1,3}),(\d{1,3})\)/g
    return memoryDump.match(instructionExp)
}

function aggregateInstructions(instructions: string[]|null) {
    if (instructions==null){
        return 0
    }

    return instructions
        .map(parseInstruction)
        .map(operands => operands[0]*operands[1])
        .reduce((acc, result) => {
            acc += result             
            return acc
        }, 0)
}

    
function parseInstruction(instruction: string) {
    return instruction.slice(4, -1).split(",").map(o => parseInt(o, 10))
}