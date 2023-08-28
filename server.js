const express = require('express');
const router = express.Router();
const http2Express = require('http2-express-bridge')
const http2 = require('http2')
const fs = require('fs')
const winston = require("winston")
const users = require("./users.json")

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

const logger = winston.createLogger({
    level: "info", // Set log level
    format: winston.format.json(), // Use JSON format
    defaultMeta: { service: "node-http2-app" }, // Add metadata
    transports: [
        new winston.transports.Console(), // Log to console
    ],
});

router.get("/admin", async (req, res) => {  
    try {
        res.json({ message: "Welcome to HTTP2 API" });
        logger.info("Request handled successfully");
    } catch (error) {
        logger.error("Error in /admin route", { error });
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/users", (req, res) => {
    try {
        res.json(users);
    } catch (error) {
        console.error("Error in /users route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use('/api', router);

const server = http2.createSecureServer(options, app)

server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(`SSL ${useSSL ? 'enabled' : 'disabled'}`);
});