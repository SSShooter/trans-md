const path = require('path')
var fs = require('fs')
var translator = require('./translator')
let folderRecursion = async function (targetPath) {
  var files = fs.readdirSync(targetPath)
  for (filename of files) {
    var filedir = path.join(targetPath, filename);
    var stats = fs.statSync(filedir)
    var isFile = stats.isFile()
    if (isFile) {
      if (path.extname(filedir) === '.md') {
        await translator(filedir);
      }
    } else {
      await folderRecursion(filedir);
    }
  }
}

module.exports = folderRecursion