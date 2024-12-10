import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(readDiskMap)
    .then(compressDisk)
    .then(calculateChecksum)
    .then(console.log)

function readDiskMap(data: string) {
    let diskmap: string[] = []
    let rawMap = data.split("")
        
    rawMap.forEach((f, id) => {
        if(id%2 !== 0) { return }
        
        for (let i = 0; i < parseInt(f); i++) {
            diskmap.push(`${id/2}`)
        }

        if(id !== rawMap.length-1) {
            for (let i = 0; i < parseInt(rawMap[id+1]); i++) {
                diskmap.push(`.`)
            }    
        }
    });

    return diskmap
}
    
    
function compressDisk(diskmap: string[]) {
    let free = diskmap.indexOf(".")

    if(free === -1 ){
        return diskmap
    }

    for (let last = diskmap.length-1; free < last; last--) {
        const lastElement = diskmap[last];
        if (lastElement === "."){
            continue
        } 
        
        diskmap.splice(free, 1, `${lastElement}`);
        diskmap[last] = ".";
        free = diskmap.indexOf(".");
    }

    return diskmap
}

function calculateChecksum(diskmap: string[]) {
    let checksum = 0
    let last = diskmap.indexOf(".")

    for(let i = 0; i < last; i++) {
        const f = parseInt(diskmap[i]);
        checksum += i*f;
    }

    return checksum
}