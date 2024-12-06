import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(readInstructions)
    .then(aggregateInstructions)
    .then(console.log)

function readInstructions(memoryDump: string) {
    let mulInstructionExp = /^mul\((\d{1,3}),(\d{1,3})\)/g
    let doInstructionExp = /^do\(\)/g
    let dontInstructionExp = /^don't\(\)/g

    let instructions: string[] = [];
    let filter = "";
    
    let dump = memoryDump.split("\r\n").join("")
    
    // Use a loop to find all matches
    let i=0
    while (i<dump.length) {
        let inc = 0
        
        if(dontInstructionExp.exec(dump.slice(i))!==null){
            filter = "dont";
            inc = inc + 7
        }
        
        if(doInstructionExp.exec(dump.slice(i))!==null){
            filter = "do";
            inc = inc + 4
        }
        
        let instruction = mulInstructionExp.exec(dump.slice(i))
        
        if(instruction!==null && filter!=="dont"){
            instructions.push(instruction[0])
            inc = inc + instruction.length
        }

        if(inc===0){
            i = i + 1
        } else{
            i = i + inc
        }
    }
    
    return instructions
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