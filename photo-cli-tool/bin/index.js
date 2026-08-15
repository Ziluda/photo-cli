const fs = require('node:fs');
const path = require('node:path');

const inputPath = "../../../Desktop/messy";

function direntArray(folderPath) {
    // create the array of all the items (files AND/OR folders) in this directory using folderPath
    // returns a list of Dirent objects
    return fs.readdirSync(folderPath, { withFileTypes: true });
}
function deepest(folderPath) {

    // create the an array with only directories
    const directories = direntArray(folderPath).filter((item) => item.isDirectory());

    // base case: when you reach a leaf folder
    // check if this directory is a leaf folder (i.e. there shouldn't be any directories in it)
    if (directories.length === 0) {
        return 0;
    }

    // recursive case: when there is at least one directory in the next level
    return 1 + Math.max(...(directories.map(item => deepest(path.join(folderPath, item.name)))));

}

function empty(folderPath) {
    return (direntArray(folderPath).length === 0);
}

function itemSize(itemPath) {
    return fs.statSync(itemPath).size;
}

function folderSize(folderPath) {
    const folderArray = direntArray(folderPath);
    let totalBytes = 0;

    for (const item of folderArray) {
        itemPath = path.join(folderPath, item.name);

        if (item.isDirectory()) {
            totalBytes += folderSize(itemPath);
        } else if (item.isFile()) {
            totalBytes += itemSize(itemPath);
        }
    }

    return totalBytes;
}