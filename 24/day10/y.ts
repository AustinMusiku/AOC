import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(prepareTmap)
    .then(countTrails)
    .then(console.log)

type Coordinate = {
    x: number
    y: number
}

function prepareTmap(data: string) {
    return data
        .split("\r\n")
        .map(row => row.split("").map(col => parseInt(col)))
}
    
    
function countTrails(tmap: number[][]) {
    let trails = 0
    let trailStopsQ: Coordinate[] = []
    
    // collect all trailheads
    tmap.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            if(tmap[rowIdx][colIdx] === 0 ){
                trailStopsQ.push({x: colIdx, y: rowIdx})
            }
        })
    });

    while (trailStopsQ.length > 0) {
        let stop = trailStopsQ.pop();
        if (stop === undefined) {
            return
        }
        let {y, x} = stop
        
        if (tmap[y][x] === 9 ){
            trails += 1
            continue
        }
        
        // check up 
        if (y > 0 && tmap[y-1][x]-tmap[y][x] === 1){
            trailStopsQ.push({x, y: y-1})
        }
        
        // check right
        if (x < tmap[0].length-1 && tmap[y][x+1]-tmap[y][x] === 1){
            trailStopsQ.push({x: x+1, y})
        }
        
        // check down
        if (y < tmap.length-1 && tmap[y+1][x]-tmap[y][x] === 1){
            trailStopsQ.push({x, y: y+1})
        }
        
        // check left
        if (x > 0 && tmap[y][x-1]-tmap[y][x] === 1){
            trailStopsQ.push({x: x-1, y})
        }
    }
    
    return trails
}