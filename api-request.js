import { createServer } from 'http';
const PORT = 8000;

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jack Doe' },
    { id: 3, name: 'Jim Doe' },
    { id: 4, name: 'Jill Doe' },
    { id: 5, name: 'Jake Doe' },
    { id: 6, name: 'Julie Doe' },
    { id: 7, name: 'James Doe' },
    { id: 8, name: 'Jessica Doe' },
    { id: 9, name: 'Jordan Doe' },
];
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};
const getUserByIdHandler = (req, res) => {
  const id = req.url.split('/')[3];
  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'User not found' }));
  }
  res.end();
};

const createUserHandler = (req, res) => {
  let body = '';
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
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Route not found' }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === '/api/users' && req.method === 'GET') {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === 'GET'
      ) {
        getUserByIdHandler(req, res);
      } else if (req.url === '/api/users' && req.method === 'POST') {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});