import { readFileSync } from 'fs';
import path from 'path';

type Hand = {
    cards: string,
    type: number,
    bid: number
}

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const totalWinnings = data.split('\r\n')
    .map(formatHands)
    .sort(sortHands)
    .map((hand, i) => hand.bid * (i + 1))
    .reduce((acc, win) => acc + win)

console.log(totalWinnings)

function formatHands(row: string): Hand {
    return {
        cards: row.split(' ')[0],
        type: assignType(row.split(' ')[0]),
        bid: Number(row.split(' ')[1])
    }
}

function sortHands(x: Hand, y: Hand) {
    if(x.type !== y.type) return x.type - y.type

    let order = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

    for (let i = 0; i < x.cards.length; i++) {
        if(x.cards[i] === y.cards[i]) continue
        return order.indexOf(y.cards[i]) - order.indexOf(x.cards[i])
    }

    return 0
}

function assignType(cards: string) {
    const uniqueCharacters = new Set(cards.split('')).size
    let type: number = 0

    switch(uniqueCharacters) {
        case 1: 
            type = 7
            break

        case 4: 
            type = 2
            break

        case 5: 
            type = 1
            break

        case 2: {
            let counts = getCounts(cards)
            let values = Object.values(counts)
            type = values.includes(4) ? 6: 5
            break       
        }
        case 3: {
            let counts = getCounts(cards)
            let values = Object.values(counts)
            type = values.includes(3) ? 4 : 3
            break
        }
    }

    function getCounts(cards: string) {
        return cards.split('').reduce((acc, card) => {
            acc[card] = acc[card] ? acc[card] + 1 : 1
            return acc
        }, {} as {[key: string]: number})
    }

    return type
}