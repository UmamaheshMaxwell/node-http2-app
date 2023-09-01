const http2 = require('http2');
const fs = require("fs")
const PORT = process.env.PORT || 8080;

const server = http2.createServer();

server.on('stream', (stream, headers) => {
  const method = headers[':method'];
  const path = headers[':path'];

  if (method === 'GET' && path === '/') {
    // Handle the root endpoint
    stream.respond({ ':status': 200, 'content-type': 'text/plain' });
    stream.end('Hello, this is the root endpoint!');
  } else if (method === 'GET' && path === '/about') {
    // Handle the /about endpoint
    stream.respond({ ':status': 200, 'content-type': 'text/plain' });
    stream.end('This is the about page.');
  } else if (method === 'GET' && path === '/users') {
    // Read the JSON data from a file (users.json)
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        // Handle error, e.g., file not found
        stream.respond({ ':status': 500, 'content-type': 'text/plain' });
        stream.end('Internal Server Error', err);
        return;
      }

      // Set response headers
      stream.respond({
        ':status': 200,
        'content-type': 'application/json',
      });

      // Send the JSON data as a string
      stream.end(data);
    })
  }
  else {
    // Handle other endpoints or return a 404
    stream.respond({ ':status': 404, 'content-type': 'text/plain' });
    stream.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
