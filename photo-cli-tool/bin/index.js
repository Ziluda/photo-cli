const fs = require('node:fs');
const path = require('node:path');

const inputPath = "../../../Desktop/messy";
const emptyPath = "../../../Desktop/messy/thisEmpty";

function deepest(folderPath) {
    // create the array of all the items (files AND/OR folders) in this directory using folderPath
    const folderArray = fs.readdirSync(folderPath, { withFileTypes: true });

    // create the an array with only directories
    const directories = folderArray.filter((item) => item.isDirectory());

    // base case: when you reach a leaf folder
    // check if this directory is a leaf folder (i.e. there shouldn't be any directories in it)
    if (directories.length === 0) {
        return 0;
    }

    // recursive case: when there is at least one directory in the next level
    return 1 + Math.max(...(directories.map(item => deepest(path.join(folderPath, item.name)))));

}

function empty(folderPath) {
    const folderArray = fs.readdirSync(folderPath, { withFileTypes: true });
    return (folderArray.length === 0);
}

console.log(`deepest: ${deepest(inputPath)}\nempty true: ${empty(emptyPath)}`);
