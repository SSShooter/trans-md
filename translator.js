const path = require('path')
var fs = require('fs')
var translate = require('./translate')
var sleep = require('./sleep')

let translator = async (filePath) => {
    let baseName = path.win32.basename(filePath,'.md')
    let newPath = path.join(filePath,'..',baseName + '-translated.md')
    process.stdout.write(baseName + ' translate start\n')
    process.stdout.write('will export to \n' + newPath + '\n')
    try {
      var data = fs.readFileSync(filePath, 'utf8')
    } catch (err) {
      console.log('Err wrong filePath\n' + err)
      process.exit(1)
    }
    let array = data.split('\n')
    let isCode = false
  
    let translated = []
    let translatedCompare = []
  
    for (let i = 0; i < array.length; i++) {
      let current = array[i]
      // for jsinfo
      if (current.trim().startsWith('````')) {
        translated[i] = current + '\n'
        translatedCompare[i] = ''
        continue
      }
      // for learnpub
      if (current.trim().match(/^\{pagebreak\}$/)) {
        translated[i] = current + '\n'
        translatedCompare[i] = ''
        continue
      }
      // escape image
      if (current.trim().match(/^!\[.*\]\(.+\)$/)) {
        translated[i] = current + '\n'
        translatedCompare[i] = ''
        continue
      }
      if (
        current.trim() === '' ||
        current.trim() === '\r' ||
        current.trim() === '\n'
      ) {
        translated[i] = current + '\n'
        translatedCompare[i] = ''
        continue
      }
      if (current.trim().startsWith('```')) {
        isCode = !isCode
      }
      if (isCode) {
        translated[i] = current + '\n'
        translatedCompare[i] = ''
        continue
      }
      if (current.trim().startsWith('```')) {
        translated[i] = current + '\n'
        translatedCompare[i] = ''
        continue
      }
      try {
        var result = await translate(current, { raw: true, to: 'zh-CN' })
        await sleep(500)
      } catch (err) {
        console.log('Err network error\n' + err)
        process.exit(1)
      }
      translated[i] = result + '\n'
      translatedCompare[i] = result + '\n'
  
      let percentage = ((i * 100) / array.length).toFixed(2)
      printPct(' ' + (percentage < 10 ? ' ' + percentage : percentage))
    }
    printPct(100)
  
    // fs.writeFile(newPath, translated.join(''), function (err) {
    //   if (err) process.stdout.write('\nwriteFile fail')
    //   else process.stdout.write('\nwriteFile complete')
    // })
    let translated2 = array.map((val, index) => {
      return translatedCompare[index] + val + '\n'
    })
    fs.writeFile(newPath, translated2.join(''), function (err) {
      if (err) process.stdout.write('\nwriteFile fail')
      else process.stdout.write('\nwriteFile complete')
    })
    function printPct(percentage) {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(percentage + '% complete')
    }
  }

  module.exports = translator