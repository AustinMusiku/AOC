import { readFileSync } from 'fs';
import path from 'path';

type Card = {
    name: string
    numbers: {
        winning: number[]
        current: number[]
    }
}

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const sum = data.split('\r\n')
    .map(splitCard)
    .map(countWinningMatches)
    .map(calculateCardPoints)
    .reduce((acc, cardPoints) => acc + cardPoints )

console.log(sum)

function splitCard(row: string) {
    let numbers = row.split(': ')[1].split(' | ')

    return {
        name: row.split(': ')[0].split('Card ')[1].trim(),
        numbers: {
            winning: numbers[0].split(' ').filter(i => i !== '').map(Number),
            current: numbers[1].split(' ').filter(i => i !== '').map(Number)
        },
    } as Card
}

function countWinningMatches(card: Card) {
    const { winning, current } = card.numbers
    const intersection = current.filter(winner => winning.includes(winner))
    return intersection.length
}

function calculateCardPoints(wins: number) {
    if (wins===0) return 0;

    const total = 1 * Math.pow(2, wins-1)
    return total
}