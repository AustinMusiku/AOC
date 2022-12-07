import { readFileSync } from 'fs';

interface IOutcome {
    opp: string;
    me: string;
}

const input: string = readFileSync('input.txt', 'utf8');

let rawData = input.split('\n');
let data = rawData.map(s => s.trimEnd());

let outcomes: IOutcome[] = data.map(pair => { return {opp: pair[0], me: pair[2]} });

function choose(outcome: IOutcome){
    const [ opp, me ] = [ outcome.opp, outcome.me ];
    if(me === 'X'){
        // loose
        switch (opp){
            case 'A':
                outcome.me = 'Z';
                break;
            case 'B':
                outcome.me = 'X';
                break;
            case 'C':
                outcome.me = 'Y';
                break;
        }
    }
    else if(me === 'Y'){
        // draw
        switch (opp){
            case 'A':
                outcome.me = 'X';
                break;
            case 'B':
                outcome.me = 'Y';
                break;
            case 'C':
                outcome.me = 'Z';
                break;
        }
    }
    else if(me === 'Z'){
        // win
        switch (opp){
            case 'A':
                outcome.me = 'Y';
                break;
            case 'B':
                outcome.me = 'Z';
                break;
            case 'C':
                outcome.me = 'X';
                break;
        }
    }
    return outcome;
}

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

    if((me === 'X' && opp === 'C') || (me === 'Y' && opp === 'A') || (me === 'Z' && opp === 'B')){
        // I win
        score += 6;
    } 
    else if((me === 'X' && opp === 'A') || (me === 'Y' && opp === 'B') || (me === 'Z' && opp === 'C')){
        // Draw
        score += 3;
    }

    return score;        
}

let totalScores: number = outcomes
    .map(outcome => choose(outcome))
    .map(outcome => evaluate(outcome))
    .reduce((a, b) => a + b);

console.log(totalScores);