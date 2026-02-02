const fs = require('fs');
const readline = require('readline');

const logFile = "log.txt";

let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

const stream = fs.createReadStream(logFile);

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    if (line.includes("ERROR")) errorCount++;
    else if (line.includes("WARNING")) warningCount++;
    else if (line.includes("INFO")) infoCount++;
});

rl.on('close', () => {
    console.log("Log File Summary Report:");
    console.log("Errors:", errorCount);
    console.log("Warnings:", warningCount);
    console.log("Info:", infoCount);
});


