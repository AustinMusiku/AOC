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

    // The prediction(px where x is a non-negative int) is:
    // the first number in the sequence - the prediction of the differences of itself

    // assuming the array is [x, y, z]:
    // the differences are [x-y, y-z]

    //  [p1 ,   x    ,   y   ,    z]
    //     [p2  ,   x-y  ,   y-z]

    // It's clear that p1 + p2 = x, 
    // so to find p1, p1 = x - p2
    let prediction = arr[0] - calculatePrediction(arrDiffs.slice(1))

    return prediction
}