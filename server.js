const express = require('express')
const http2Express = require('http2-express-bridge')
const http2 = require('http2')
const fs = require('fs')
const adminRouter = require('./routes/admin.router');

const app = http2Express(express)

const PORT = 443;
const CERT_DIR = `${__dirname}/cert`;
const useSSL = !!process.env.SSL;

const options = {
    key: fs.readFileSync(`${CERT_DIR}/server.key`),
    cert: fs.readFileSync(`${CERT_DIR}/server.crt`),
    passphrase: "sF6EJzpNqKI6pO43lRuXYPb1x/SZlNc22ZR7S2D5kM4=",
    rejectUnauthorized: false 
};


app.use('/api', adminRouter);

const server = http2.createSecureServer(options, app)

server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(`SSL ${useSSL ? 'enabled' : 'disabled'}`);
});