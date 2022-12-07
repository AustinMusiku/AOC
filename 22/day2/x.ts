import { readFileSync } from 'fs';

interface IOutcome {
    opp: string;
    me: string;
}

const input: string = readFileSync('input.txt', 'utf8');

let data = input.split('\r\n');

let outcomes: IOutcome[] = data.map(pair => { return {opp: pair[0], me: pair[2]} });

// B defeats X
// C defeats Y
// A defeats Z

function evaluate(outcome: IOutcome): number {
    let score: number = 0;
    const [ opp, me ] = [ outcome.opp, outcome.me ];
    switch (me){
        case 'X':
            score += 1
            break;
        case 'Y':
            score += 2
            break;
        case 'Z':
            score += 3
            break;
    }

    if(
        (me === 'X' && opp === 'C') ||
        (me === 'Y' && opp === 'A') ||
        (me === 'Z' && opp === 'B')){
        // I win
        score += 6;
    } 
    
    else if (
        (me === 'X' && opp === 'A') ||
        (me === 'Y' && opp === 'B') ||
        (me === 'Z' && opp === 'C')){
        // Draw
        score += 3;
    }

    return score;        
}

let totalScores: number = outcomes
    .map(outcome => evaluate(outcome))
    .reduce((a, b) => a + b);

console.log(totalScores);