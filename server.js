// const http2 = require('http2');
// const fs = require('fs');
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

var fs = require('fs');
var Hapi = require('@hapi/hapi');
var http2 = require('http2');


var server = new Hapi.Server({
  listener: http2.createServer(),
 // host: 'localhost',
  port: 8080
});

server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
        return 'Welcome to HTTP2 Server';
    }
});

server.route({
  method: 'GET',
  path:'/users', 
  handler: function (request, reply) {
      return fs.readFileSync('users.json', 'utf8')
  }
});

async function startServer() {
  try {
    await server.start();
    console.log(`Server started at ${server.info.uri}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();