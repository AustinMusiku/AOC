import { readFile } from "fs/promises";
// split lines
// reduce: accumulator({left: [], right: []})
// sort both
// map: (right - left)
// reduce: add all distances

readFile('./input.txt', {encoding: 'utf-8'})
    .then(processData)
    .then(console.log)
    
function processData(rawData: string) {
    let lines = rawData.split('\r\n')
    
    let pairs = lines
    .reduce((acc: {left: number[], right: number[]}, current) => {
        let [left, right] = current.split("  ")
        
        acc.left.push(parseInt(left))
        acc.right.push(parseInt(right))
        
        return acc
    }, {left: [], right: []})
    
    pairs.left.sort((x, y) => x - y)
    pairs.right.sort((x, y) => x - y)
    
    let sumDistances = 0
    
    for(let i=0; i<pairs.left.length; i++){
        if (pairs.left[i] > pairs.right[i]){
            sumDistances += pairs.left[i]-pairs.right[i]
        } else {
            sumDistances += pairs.right[i]-pairs.left[i]
        }
    }

    return sumDistances
}
    