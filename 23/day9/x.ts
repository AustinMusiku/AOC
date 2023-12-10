import { readFileSync } from 'fs';
import path from 'path';

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const histories = data.split('\r\n')
    .map(row => row.split(' ').map(Number))
    .map(calculatePrediction)
    .reduce((acc, prediction) => acc + prediction, 0)

console.log(histories)

function calculatePrediction(arr: number[]): number {
    // Once all differences are 0, we've reached the end of the sequence
    if (arr.every(n => n === 0)) return 0
    
    // Calculate the differences between each number in the sequence
    // Omit the first difference, as it's always 0
    let arrDiffs = arr.map((n, i) => i === 0 ? 0 : n - arr[i-1])

    // The prediction is the last number in the sequence + the prediction of the differences of itself
    let prediction = arr[arr.length-1] + calculatePrediction(arrDiffs.slice(1))

    return prediction
}