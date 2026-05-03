// import fs from 'fs';

import fs from 'fs/promises';

// readfile callback (non promise version)
// fs.readFile('./test.txt', 'utf-8',(err, data)=> {
//   if(err) throw err
//   console.log(data);
// })

// readFileSync callback
// NOTE: Should be only use if file is small 
// const dataSync = fs.readFileSync('./test.txt', 'utf-8');
// console.log(dataSync)

// readFile() - Promise .then()
// fs.readFile('./test.txt', 'utf-8')
// .then((data) => console.log(data))
// .catch((err) => console.log(err))


// readFile() - Async Await
const readFile = async() => {
  try {
    const data = await fs.readFile('./test.txt', 'utf-8')
    console.log(data)
  } catch(err) {
    console.log(err)
  }
}

// readFile();


// writefile() 
const writeFile = async () => {
  try {
    await fs.writeFile('./test.txt', 'This is the first write file in Nodejs1. \nHello wriiting to new file1')
    console.log('Written into new file')
  } catch (err) {
    console.log(err)
  }
}

// writeFile();
// readFile();

// appendFile()
const appendFile = async() => {
  try {
    await fs.appendFile('./test.txt', '\n New appnended text on new line')
    console.log('new text appened to file')
  } catch(err) {
    console.log(err)
  }
 }
 appendFile();
 readFile();