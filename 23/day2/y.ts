import { readFileSync } from 'fs';
import path from 'path';

type Game = {[key: string]: number }

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const sumOfPowers = data.split('\r\n')
    .map(row => row.split(': ')[1])
    .map(splitCubeSets)
    .map(getPower)
    .reduce((acc, i) => acc + i)

console.log(sumOfPowers)


function splitCubeSets(games: string) {
    return games
        .split('; ')
        .map(groupCubesSet)
}

function groupCubesSet(cubes: string) { 
    let game: Game = { red: 0, blue: 0, green: 0 }

    cubes.split(', ').forEach(cube => {
        let [amount, color] = cube.split(' ')
        game[color] = Number(amount)
    })

    return game
}

function getPower(games: Game[], i: number) {
    let min: Game = { red: 0, blue: 0, green: 0 }

    min.red = Math.max(...games.map(game => game.red).filter(i => i > 0))
    min.blue = Math.max(...games.map(game => game.blue).filter(i => i > 0))
    min.green = Math.max(...games.map(game => game.green).filter(i => i > 0))

    return min.red * min.blue * min.green
}
