import  url from 'url';
import path from 'path';

const filePath = './dir1/dir2/test.txt';

// basename()
console.log(path.basename(filePath));

// dirname()
console.log(path.dirname(filePath));

// extname()
console.log(path.extname(filePath))

// parse (all above[basename, dirname, extname])
console.log(path.parse(filePath));


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname, __filename);

// join()
const filePath2 = path.join(__dirname,'dir1','dir2','text2.txt');
console.log(filePath2);

// resolve()
const filePath3 = path.resolve(__dirname,'dir1','dir2','text2.txt');
console.log(filePath3);
