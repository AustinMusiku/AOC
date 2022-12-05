export const x = '';

import { readFileSync } from 'fs';

const input: string = readFileSync('input.txt', 'utf8');

let data = input.split('\r\n');

interface IMove {
    quantity: number
    from: number;
    to: number;
}

class Stack {
    private top: number;
    private crates: string[];
    
    constructor(items?: string[]){
        this.top = items ? items.length - 1: -1;
        this.crates = items?.reverse()||[];
    }

    public pop(quantity: number): string[]{
        this.top -= quantity
        return this.crates.splice(-1 * quantity)
    }

    public push(crates: string[]): void{
        this.top += crates.length
        this.crates.push(...crates)
    }

    public peek(): string{
        return this.crates[this.top]
    }

    public length(): number{
        return this.top + 1
    }
} 

let stacks = new Map<string, Stack>()
stacks.set(`stack1`, new Stack(['G','J','W','R','F','T','Z']))
stacks.set(`stack2`, new Stack(['M','W','G']))
stacks.set(`stack3`, new Stack(['G','H','N','J']))
stacks.set(`stack4`, new Stack(['W','N','C','R','J']))
stacks.set(`stack5`, new Stack(['M','V','Q','G','B','S','F','W']))
stacks.set(`stack6`, new Stack(['C','W','V','D','T','R','S']))
stacks.set(`stack7`, new Stack(['V','G','Z','D','C','N','B','H']))
stacks.set(`stack8`, new Stack(['C','G','M','N','J','S']))
stacks.set(`stack9`, new Stack(['L','D','J','C','W','N','P','G']))


function rowToMoves(row: string): IMove{
    const words = row.split(" ");

    return {
        quantity: parseInt(words[1]),
        from: parseInt(words[3]),
        to: parseInt(words[5])
    }
}
function makeMove(move: IMove): void {
    let { quantity,from, to } = move
    let src = stacks.get(`stack${from}`)
    let dst = stacks.get(`stack${to}`)
    if (src === undefined || dst === undefined) return;

    let cratesToMove = src.pop(quantity)
    dst.push(cratesToMove)
}

data
    .map(row => rowToMoves(row))
    .forEach(move => makeMove(move));

let topItems: string[] = []

stacks
    .forEach(item => {
        topItems.push(item.peek())  
    });

console.log(topItems.join(''));