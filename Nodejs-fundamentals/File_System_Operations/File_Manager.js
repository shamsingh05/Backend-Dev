const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const file1 = process.argv[3];
const file2 = process.argv[4];

// Read file
if (command === "read") {
    fs.readFile(file1, 'utf8', (err, data) => {
        if (err) console.log("Error:", err.message);
        else console.log("File Content:\n", data);
    });
}

// Write file
else if (command === "write") {
    const content = process.argv[4];
    fs.writeFile(file1, content, err => {
        if (err) console.log("Error:", err.message);
        else console.log("File written successfully!");
    });
}

// Copy file
else if (command === "copy") {
    fs.copyFile(file1, file2, err => {
        if (err) console.log("Error:", err.message);
        else console.log("File copied successfully!");
    });
}

// Delete file
else if (command === "delete") {
    fs.unlink(file1, err => {
        if (err) console.log("Error:", err.message);
        else console.log("File deleted successfully!");
    });
}

// List directory
else if (command === "list") {
    fs.readdir(file1, (err, files) => {
        if (err) console.log("Error:", err.message);
        else console.log("Files:", files);
    });
}

else {
    console.log("Invalid command!");
}
