import { readFile } from "fs/promises";

const blinks = parseInt(process.argv[2])

readFile('./input.txt', {encoding: 'utf-8'})
    .then(data => data.split(" "))
    .then(observe)
    .then(console.log)

type Cache = {[key: string]: number}

function observe(stones: string[]) {
    let stoneToCounts: Cache = {}
    
    stones.forEach(stone => {
        stoneToCounts[stone] = (stoneToCounts[stone] ?? 0) + 1
    });
    
    for (let i = 0; i < blinks; i++) {
        let nextCache: Cache = {}
        for (const stone of Object.keys(stoneToCounts)) {
            let keys: string[] = []
            if(stone==='0'){
                keys.push("1")
            }

            else if(stone.length%2===0){
                let l = stone.slice(0, stone.length/2),
                    r = `${parseInt(stone.slice(stone.length/2))}`
                keys.push(l, r)
            } 
            
            else{
                keys.push(`${parseInt(stone)*2024}`)
            }
                
            keys.forEach(key => {
                nextCache[key] = (nextCache[key] ?? 0) + stoneToCounts[stone] 
            });
        }
        stoneToCounts = nextCache 
    }
    
    return Object.values(stoneToCounts).reduce((acc, count) => acc+count, 0);
}
