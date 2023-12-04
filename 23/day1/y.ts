import { readFileSync } from "fs"
import path from "path"

let sum = readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
    .split('\r\n')
    .map(textToDigits)
    .map(getRowCalibration)
    .reduce((acc, i) => acc + i)

console.log(sum)

// map TextsToDigits
function textToDigits(row: string) {
    const digitsInText = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

    // edge cases
    row = row.replace(new RegExp('oneight', 'g'), '18')
    row = row.replace(new RegExp('eightwo', 'g'), '82')
    row = row.replace(new RegExp('twone', 'g'), '21')
    
    digitsInText.forEach((digitText, i) => {
        if(row.includes(digitText)){
            row = row.replace(new RegExp(digitText, 'g'), `${i+1}`)
        }
    })

    return row
}

// map getRowCalibration
function getRowCalibration(row: string) {
    const digits = [1,2,3,4,5,6,7,8,9]

    let rowDigits = row.split('').filter(char => digits.includes(parseInt(char)))
    
    return Number(`${rowDigits[0]}${rowDigits[rowDigits.length-1]}`)
}