import { readFileSync } from 'fs';
import path from 'path';

type Game = {[key: string]: number }

let data =  readFileSync(path.join(__dirname, 'input.txt'), {  encoding: 'utf8'})

const sum = data.split('\r\n')
    .map(row => row.split(': ')[1])
    .map(splitCubeSets)
    .map(filterGames)
    .reduce((acc, i) => acc + i)

console.log(sum)


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

function filterGames(games: Game[], i: number) {
    let condition = games
        .every(game => game.red < 13 && game.green < 14 && game.blue < 15)

    return condition ? i + 1 : 0
}
