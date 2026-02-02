const fs = require('fs');
const path = require('path');

const dir1 = "folder1";
const dir2 = "folder2";

function syncDirectories(source, target) {
    fs.readdir(source, (err, files) => {
        if (err) {
            console.log("Error reading source:", err.message);
            return;
        }

        files.forEach(file => {
            const srcPath = path.join(source, file);
            const tgtPath = path.join(target, file);

            fs.access(tgtPath, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.copyFile(srcPath, tgtPath, err => {
                        if (err) console.log("Error copying:", err.message);
                        else console.log(`Copied: ${file}`);
                    });
                }
            });
        });
    });
}

syncDirectories(dir1, dir2);
