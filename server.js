
// const http2 = require('http2');
// const fs = require('fs');

// const server = http2.createServer();

// server.on('stream', (stream, headers) => {
//   // Handle the incoming request stream here
//   stream.respond({
//     ':status': 200,
//     'content-type': 'text/plain'
//   });
//   stream.end('Hello, HTTP/2 cleartext (h2c) world!\n');
// });

// server.listen(3000, () => {
//   console.log('HTTP/2 cleartext server is listening on port 3000');
// });

const http2 = require('http2');
const fs = require('fs');

const CERT_DIR = `${__dirname}/cert`;
const useSSL = !!process.env.SSL;
const PORT = 8080;

const server = http2.createSecureServer({
    key: fs.readFileSync(`${CERT_DIR}/server.key`),
    cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(`SSL ${useSSL ? 'enabled' : 'disabled'}`);
  });