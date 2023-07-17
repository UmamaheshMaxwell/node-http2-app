const http2 = require('http2');
const express = require('express');
const cors = require('cors');
const router = require('./routes/admin.router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

const server = http2.createSecureServer({}, app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT} sucessfully !!!`)
})
