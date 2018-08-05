var fs = require('fs')
const path = require('path')
var translator = require('./translator')
var folderRecursion = require('./folderRecursion')

let targetPath = process.argv[2]

var stats = fs.statSync(targetPath)
var isFile = stats.isFile()
if (isFile) {
    if (path.extname(targetPath) === '.md') {
        translator(targetPath);
    }
} else {
    folderRecursion(targetPath);
}