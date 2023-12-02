import { readFile } from 'fs'

readFile('./23/day1/input.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err;
    
    let calibrationSum = data.split('\r\n')
        .map(getRowCalibration)
        .reduce((acc, digit)=> acc + digit)
    
    console.log(calibrationSum)
})

function getRowCalibration(row: string) {
    const digits = [1,2,3,4,5,6,7,8,9]

    let rowDigits = row.split('').filter(char => digits.includes(parseInt(char)))
    
    return Number(`${rowDigits[0]}${rowDigits[rowDigits.length-1]}`)
    
}