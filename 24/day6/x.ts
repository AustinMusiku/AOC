import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(prepareMap)
    .then(traceRoute)
    .then(calculatePositions)
    .then(console.log)

function prepareMap(data: string) {
    return data
        .split("\r\n")
        .map(row => row.split(""))
    }
    
    
function traceRoute(map: string[][]) {
    let {y, x} = findGuardPosition(map)
    let direction = "up"
    let cursor = "^"
    
    function move(direction: string){
        // stop if we're at the edge of the map
        if(
            (direction === "up" && y === 0) ||
            (direction === "right" && x === map[0].length-1) ||
            (direction === "left" && x === 0) ||
            (direction === "down" && y === map.length-1)

        ){
            map[y][x] = "X"
            return
        }

        if(direction==="up"){
            if(map[y-1][x]==="#"){
                direction = "right"
                cursor = ">"
            } else {
                map[y][x] = "X"
                y -= 1
                map[y][x] = cursor
            }
        } else if(direction==="right"){
            if(map[y][x+1]==="#"){
                direction = "down"
                cursor = "v"
            } else {
                map[y][x] = "X"
                x += 1
                map[y][x] = cursor
        }
        } else if(direction==="down"){
            if(map[y+1][x]==="#"){
                direction = "left"
                cursor = "<"
            } else {
                map[y][x] = "X"
                y += 1
                map[y][x] = cursor
            }
        } else if(direction==="left"){
            if(map[y][x-1]==="#"){
                direction = "up"
                cursor = "^"
            } else {
                map[y][x] = "X"
                x -= 1
                map[y][x] = cursor
            }
        }
        
        move(direction)
    }

    move(direction)

    return map
}

function findGuardPosition(map: string[][]) {
    let position = {y: 0, x: 0}
    
    map.forEach((row, rowIdx) => {
            row.forEach((_, colIdx) => {
                if(map[rowIdx][colIdx]==="^"){
                    position.x = colIdx
                    position.y = rowIdx
                }
            })
        })

    return position
}

function calculatePositions(map: string[][]) {
    return map
        .map((row, rowIdx) => row.filter((col) => col === "X").length)
        .reduce((acc, perRow) => acc += perRow, 0)
}