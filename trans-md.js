let filePath = process.argv[2]
;(async () => {
  var fs = require('fs')
  var translate = require('./index.js')
  try {
    var data = fs.readFileSync(filePath, 'utf8')
  } catch (err) {
    console.log('Err wrong filePath\n' + err)
    process.exit(1)
  }
  let array = data.split('\n')
  let isCode = false

  let translated = []
  let translated4compare = []

  for (let i = 0; i < array.length; i++) {
    let current = array[i]
    if (current.trim().startsWith('````')) {
      translated[i] = current + '\n'
      translated4compare[i] = ''
      continue
    }
    if (
      current.trim() === '' ||
      current.trim() === '\r' ||
      current.trim() === '\n'
    ) {
      translated[i] = current + '\n'
      translated4compare[i] = ''
      continue
    }
    if (current.trim().startsWith('```')) {
      isCode = !isCode
    }
    if (isCode) {
      translated[i] = current + '\n'
      translated4compare[i] = ''
      continue
    }
    if (current.trim().startsWith('```')) {
      translated[i] = current + '\n'
      translated4compare[i] = ''
      continue
    }
    try {
      let result = await translate(current, { raw: true, to: 'zh-CN' })
      translated[i] = result + '\n'
      translated4compare[i] = result + '\n'
    } catch (err) {
      console.log('Err network error\n' + err)
      process.exit(1)
    }
    let percentage = ((i * 100) / array.length).toFixed(2)
    printPct(' ' + (percentage < 10 ? ' ' + percentage : percentage))
  }
  printPct(100)
  fs.writeFile('./translated.md', translated.join(''), function(err) {
    if (err) process.stdout.write('\nwriteFile fail')
    else process.stdout.write('\nwriteFile complete')
  })
  let translated2 = array.map((val, index) => {
    return translated4compare[index] + val + '\n'
  })
  fs.writeFile('./translated2.md', translated2.join(''), function(err) {
    if (err) process.stdout.write('\nwriteFile fail')
    else process.stdout.write('\nwriteFile complete')
  })
  function printPct(percentage) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(percentage + '% complete')
  }
})()
