const express = require('express');
const http2 = require('http2'); // Use http2
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const server = http2.createServer(app); // Create an HTTP/2 server
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
