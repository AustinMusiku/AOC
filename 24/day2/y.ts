import { readFile } from "fs/promises";

readFile('./input.txt', {encoding: 'utf-8'})
    .then(analyzeReports)
    .then(console.log)

function analyzeReports(rawReports: string) {
    let reports = rawReports.split("\r\n")
    
    return reports
        .map(parseReport)
        .map(dampener)
        .reduce((acc, r) => {
            if (r == true){
                acc += 1 
            }

            return acc
        }, 0)
}

function parseReport(report: string) {
    return report.split(" ").map(l => parseInt(l))
}

function dampener(levels: number[]) {
    if (isReportSafe(levels)){
        return true
    }
    
    let faultyLevels = levels
        .map((_: any, index: number) => {
            return isReportSafe(levels.filter((_, i) => i != index)) 
        })
        .filter(l =>  l === true )   
    
    if (faultyLevels.length > 0) {
        return true
    } 
    
    return false
}

function isReportSafe(levels: number[]) {
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