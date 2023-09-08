const fs = require('fs');

// Blocking and synchronous way...
// const textIp = fs.readFileSync('./txt/input.txt', 'utf-8');

// const textOut = `about avocadoes: ${textIp}\n created on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('file written successfully.');


// Non-blocking and asynchronous way...

fs.readFile('./txt/start.txt','utf-8', (err, data) => {
  console.log('read file 1 💥')
  fs.readFile(`./txt/${data}.txt`,'utf-8', (err, data1) => {
    console.log('🤍reading from read-this: ', data1)
    fs.readFile(`./txt/append.txt`,'utf-8', (err, data2) => {
      fs.writeFile('./txt/final.txt', `${data1}\n${data2}`, 'utf-8', err => {
        console.log('file written successfully.')
      })
    })
  })
})

console.log('💥you will see this before the readFile is executed...')