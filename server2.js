import { createServer } from 'http';

import fs from 'fs/promises';

const PORT = process.env.PORT;

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jill Doe' },
  { id: 3, name: 'Jake Doe' },
];

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

const appendLogs = async(message) => {
  try {
    const timestamp = formatDate(new Date());
    await fs.appendFile('./errors.txt', '\n'+timestamp+' '+message)
    console.log('new text appened to lggger file')
  } catch(err) {
    console.log(err)
  }
 }


//Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  appendLogs(`${req.method} ${req.url}`)
  next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

// Route handler GET api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

// Route Handler GET api/users/${id}
const getUsersByIdHandler = (req, res) => {
  const id = req.url.split('/')[3];
  const singleUser = users.find((user) => user.id === parseInt(id));
  if (singleUser) {
    res.write(JSON.stringify(singleUser));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'User not found' }));
    appendLogs(`message: 'User not found'`)
  }
  res.end();
};

// Route Handler for POST api/users/
const createUserHandler = (req, res) => {
  let body = '';
  // listen for the data
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

// Not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  appendLogs(`statusCode: '404'`)
  res.write(JSON.stringify({ message: 'route not found' }));
  appendLogs(`message: 'route not found'`)
  res.end();
};

// with middleware
const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === '/api/users' && req.method === 'GET') {
        getUsersHandler(req, res);
      } else if (req.url.match(/^\/api\/users\/([0-9]+)$/)) {
        getUsersByIdHandler(req, res);
      } else if (req.url === '/api/users' && req.method === 'POST') {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

// without middelware
// const server = createServer((req, res) => {
//   if (req.url === '/api/users' && req.method === 'GET') {
//     res.setHeader('Content-Type', 'application/json');
//     res.write(JSON.stringify(users));
//     res.end();
//   } else if (req.url.match(/^\/api\/users\/([0-9]+)$/)) {
//     const id = req.url.split('/')[3];
//     const singleUser = users.find((user) => user.id === parseInt(id));
//     res.setHeader('Content-Type', 'application/json');
//     if (singleUser) {
//       res.write(JSON.stringify(singleUser));
//     } else {
//       res.statusCode = 404;
//       res.write(JSON.stringify({ message: 'User not found' }));
//     }
//     res.end();
//   } else {
//     res.setHeader('Content-Type', 'application/json');
//     res.statusCode = 404;
//     res.write(JSON.stringify({ message: 'route not found' }));
//     res.end();
//   }
// });

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
