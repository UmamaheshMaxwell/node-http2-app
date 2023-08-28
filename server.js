const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')

const port = 8080
const CERT_DIR = `${__dirname}/cert`;
const app = express()

app.get('*', (req, res) => {
  res
    .status(200)
    .json({message: 'Welcome to node HTTP2'})
})
const options = {
    key: fs.readFileSync(`${CERT_DIR}/server.key`),
    cert: fs.readFileSync(`${CERT_DIR}/server.crt`),
    passphrase: "sF6EJzpNqKI6pO43lRuXYPb1x/SZlNc22ZR7S2D5kM4=",
    rejectUnauthorized: false 
}

spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error)
    } else {
      console.log('Listening on port: ' + port + '.')
    }
  })