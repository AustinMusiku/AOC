import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(analyzeReports)
    .then(console.log)

function analyzeReports(rawReports: string) {
    let reports = rawReports.split("\r\n")
    
    return reports
        .map(isSafe)
        .reduce((acc, r) => {
            if (r == true){
                acc += 1 
            }

            return acc
        }, 0)
}

function isSafe(report: string) {
    let levels = report.split(" ").map(l => parseInt(l))
    
    let sortDirection = 'asc'
    for (let index = 0; index < (levels.length-1); index++) {
        let diff = levels[index] - levels[index+1]
        
        if (index == 0 && diff > 0){
            sortDirection = 'desc'
        } 
        
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3){
            return false
        }

        if(sortDirection=='asc' && diff > -1){
            return false
        } else if(sortDirection=='desc' && diff < 1){
            return false
        }
    }
    return true
}