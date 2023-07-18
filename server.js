const spdy = require('spdy')
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const router = require('./routes/admin.router');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

const options = {
  key: fs.readFileSync('./cert/server.key'),       // Path to your private key file
  cert: fs.readFileSync('./cert/server.cert'),  // Path to your certificate file
  allowHTTP1: true
};

const server = spdy.createServer(options, app)

//server.on('request', app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT} successfully !!!`);
});