import { readFileSync } from 'fs';
import path from 'path';

type Record = {
    time: number,
    distance: number
}

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const rawRecords = data.split('\r\n')
    .map(row => row.split(': ')[1].trim().split(' ').filter(i => i !== '').map(Number))

const table = tabulateTimes(rawRecords)

const marginOfError = table
    .map(countWinningDistances)
    .map(winningDistances => winningDistances.length)
    .reduce((acc, wins) => acc * wins)

console.log(marginOfError)

function countWinningDistances(record: Record) {
    let winningDistances: number[] = []

    for(let i = 0; i <= record.time; i++){
        let timePressed = i // also equal to speed
        let timeTravelled = record.time - timePressed
        let distanceTravelled = timePressed * timeTravelled
        
        if(distanceTravelled > record.distance) {
            winningDistances.push(distanceTravelled)    
        }
    }
    return winningDistances
}

function tabulateTimes(rawRecords: number[][]) {
    const [times, distances] = rawRecords
    const table: Record[] = []

    for(let i = 0; i < times.length; i++){
        table.push({ time: times[i], distance: distances[i] })
    }

    return table
}