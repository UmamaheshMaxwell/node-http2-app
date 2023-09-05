const fs = require('fs');

function handleRequest(stream, method, path) {
    if (method === 'GET' && path === '/') {
      stream.respond({ ':status': 200, 'content-type': 'text/plain' });
      stream.end('Hello, Welcome to HTTP2 Endpoint');
    } else if (method === 'GET' && path === '/users') {
      fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
          stream.respond({ ':status': 500, 'content-type': 'text/plain' });
          stream.end('Internal Server Error', err);
        } else {
          stream.respond({ ':status': 200, 'content-type': 'application/json' });
          stream.end(data);
        }
      });
    } else {
      stream.respond({ ':status': 404, 'content-type': 'text/plain' });
      stream.end('Not Found');
    }
  }

  module.exports = handleRequest
