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

// const http2 = require('http2');
// const handleRequest = require("./routes/handleRequest")

// const PORT = process.env.PORT || 8080;

// const server = http2.createServer();

// server.on('stream', (stream, headers) => {
//   const method = headers[':method'];
//   const path = headers[':path'];
//   handleRequest(stream, method, path);
// });

// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

// var fs = require('fs');
// var Hapi = require('@hapi/hapi');
// var http2 = require('http2');


// var server = new Hapi.Server({
//   listener: http2.createServer(),
//   host: 'localhost',
//   port: 8080
// });

// server.route({
//     method: 'GET',
//     path:'/', 
//     handler: function (request, reply) {
//         return 'hello world';
//     }
// });

// async function startServer() {
//   try {
//     await server.start();
//     console.log(`Server started at ${server.info.uri}`);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

// startServer();