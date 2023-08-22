const express = require('express');
const spdy = require('spdy');
const fs = require('fs');

const PORT = 8080;
const CERT_DIR = `${__dirname}/cert`;

const app = express();

app.get('/', (_, res) => {
  res.send('hello world');
});

const server = spdy.createServer(
  {
    key: fs.readFileSync(`${CERT_DIR}/server.key`),
    cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
  },
  app
);

//createServer();

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('SSL Enabled');
});

// const http2 = require('http2');
// const fs = require('fs');

// const CERT_DIR = `${__dirname}/cert`;
// const useSSL = !!process.env.SSL;
// const PORT = 8080;

// const server = http2.createSecureServer({
//     key: fs.readFileSync(`${CERT_DIR}/server.key`),
//     cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
// });
// server.on('error', (err) => console.error(err));

// server.on('stream', (stream, headers) => {
//   // stream is a Duplex
//   stream.respond({
//     'content-type': 'text/html; charset=utf-8',
//     ':status': 200,
//   });
//   stream.end('<h1>Hello World</h1>');
// });

// server.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//     console.log(`SSL ${useSSL ? 'enabled' : 'disabled'}`);
//   });
