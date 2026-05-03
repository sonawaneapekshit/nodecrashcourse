import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  // Example to send response
  // res.setHeader('Content-Type', 'text/html'); // content types
  // res.statusCode=404;
  //res.end('<h1>Hello world server!</h1>');

  // sending json as response
  // res.writeHead(500, { 'Content-type': 'application/json' });
  // res.end(
  //   JSON.stringify({
  //     title: 'hellow first json response',
  //     status: 'success',
  //     hd: 'true',
  //   }),
  // );

  // shows req url (url from which we are getting request "/home" or "/" or "/about-us") and req method (post,get, put etc)
  // console.log(req.url)
  // console.log(req.method)

  // res.writeHead(200, {"Content-Type":"text/html"});
  // res.end("<h1>Hello Nodemon is running!!!</h1>")
  // res.write('hello world server');
  // console.log('req.url', req.url);
  // Code for showing the content based on requested path
  // Router example
  // try {
  //   if (req.method === 'GET') {
  //     if (req.url === '/') {
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       res.end('<h1>You are on Home page</h1>');
  //     } else if (req.url === '/about-us') {
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       res.end('<h1>You are on About us page</h1>');
  //     } else {
  //       res.writeHead(404, { 'Content-Type': 'text/html' });
  //       res.end(
  //         '<h1>You are trying to access the page which does not exist</h1>',
  //       );
  //     }
  //   } else {
  //     throw new Error('Method not allowed');
  //   }
  // } catch (error) {
  //   res.writeHead(500, { 'Content-Type': 'text/plain' });
  //   res.end('Server Error');
  // }
  try {
    if (req.method === 'GET') {
      let filePath;
      if (req.url === '/') {
        filePath = path.join(__dirname, 'public', 'index.html');
      } else if (req.url === '/about-us') {
        filePath = path.join(__dirname, 'public', 'about.html');
      } else {
        throw new Error('Not Found');
      }
      const data = await fs.readFile(filePath);
      res.setHeader('Content-Type', 'text/html');
      res.write(data);
      res.end();
    } else {
      throw new Error('Method not allowed');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
