import { readFile } from "fs/promises";

const blinks = parseInt(process.argv[2])

readFile('./input.txt', {encoding: 'utf-8'})
    .then(data => data.split(" "))
    .then(observe)
    .then(console.log)
    
function observe(stones: string[]) {
    for (let i = 0; i < blinks; i++) {
        blink(stones)
    }
    
    return stones.length
}

function blink(stones: string[]) {   
    let len = stones.length
    let cursor = 0

    for (let i = 0; i < len; i++) {
        if(stones[cursor]==='0'){
            stones[cursor] = '1'
            cursor += 1
        }
        
        else if(stones[cursor].length%2===0){
            let right = parseInt(stones[cursor].slice(stones[cursor].length/2))
            stones[cursor] = stones[cursor].slice(0, stones[cursor].length/2)
            stones.splice(cursor+1, 0, `${right}`)
            cursor += 2
        }
        
        else {
            stones[cursor] = `${parseInt(stones[cursor])*2024}`
            cursor += 1
        }
    }

    return stones
}