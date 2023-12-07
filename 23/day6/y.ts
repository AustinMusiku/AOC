import { readFileSync } from 'fs';
import path from 'path';

type Record = {
    time: number,
    distance: number
}

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const record = data.split('\r\n')
    .map(row => row.split(': ')[1].trim().split(' ').filter(i => i !== '').join(''))
    .reduce(tabulateRecord, { time: 0, distance: 0 }) 

let winningDistances: number[] = []
for(let timePressed = 0; timePressed <= record.time; timePressed++){ // timePressed is AKA speed 
    let distanceTravelled = timePressed * (record.time - timePressed) // speed * (time travelled)
    if(distanceTravelled <= record.distance) continue
    winningDistances.push(distanceTravelled)
}

console.log(winningDistances.length)

function tabulateRecord(acc: Record, current: string, idx: number): Record {
    if(idx % 2 === 0) {
        return { ...acc, time: Number(current) }
    } else {
        return { ...acc, distance: Number(current) }
    }
}