// const express = require('express');
// const http2 = require('http2');
// const fs = require('fs');
// const adminRouter = require('./routes/admin.router');

// const PORT = 8080;
// const CERT_DIR = `${__dirname}/cert`;
// const useSSL = !!process.env.SSL;

// const app = express();

// app.use('/api', adminRouter);

// const serverOptions = {
//   key: fs.readFileSync(`${CERT_DIR}/server.key`),
//   cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
//   allowHTTP1: true
// };

// const server = useSSL
//   ? http2.createSecureServer(serverOptions, app)
//   : http2.createServer(app);

// server.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
//   console.log(`SSL ${useSSL ? 'enabled' : 'disabled'}`);
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