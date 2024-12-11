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
    let last = diskmap.length-1;
    while(last > -1) {
        let {lastFileId, fileLength} = popFile(diskmap.slice(0, last+1))
        
        if (lastFileId === "."){
            last -= fileLength
            continue
        }
        
        let free = findFirstFreeSpace(diskmap.slice(0, last+1), fileLength)
        if(free === -1 ){
            last -= fileLength
            continue
        }
        
        let lastElements = diskmap.slice(last-fileLength+1, last+1)
        diskmap.splice(free, fileLength, ...lastElements);
        
        let placeholder = new Array<string>(fileLength).fill(".")
        diskmap.splice(last-fileLength+1, fileLength, ...placeholder);

        last -= fileLength
    }

    return diskmap
}

function calculateChecksum(diskmap: string[]) {
    let checksum = 0

    for(let i = 0; i < diskmap.length; i++) {
        if(diskmap[i] === "."){ continue }
        
        const f = parseInt(diskmap[i]);
        checksum += i*f;
    }

    return checksum
}

function popFile(list: string[]) {
    const lastFileId = list[list.length-1]
    let fileLength = 0
    
    for (let i = list.length-1; i > -1; i--) {
        if(list[i] === lastFileId){
            fileLength += 1
        } else {
            break
        }
    }

    return {lastFileId, fileLength}
}

function findFirstFreeSpace(list: string[], len: number) { 
    for (let i = 0; i < list.length; i++) {
        if(list[i] !== ".") continue;
        
        for (let j = 0; j < len; j++) {
            if(list[i+j] !== ".") { break }
            if(j === len-1) {
                return i
            }
        }
    }

    return -1
}