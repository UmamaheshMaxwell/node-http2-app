// const express = require('express');
// const spdy = require('spdy');
// const fs = require('fs');
// const adminRouter = require("./routes/admin.router")

// const PORT = 8080;
// const CERT_DIR = `${__dirname}/cert`;
// const useSSL = !!process.env.SSL;

// const app = express();

// app.use("/api", adminRouter)

// function createServer() {
//     if (!useSSL) {
//         return app;
//     }
//     return spdy.createServer(
//         {
//             key: fs.readFileSync(`${CERT_DIR}/server.key`),
//             cert: fs.readFileSync(`${CERT_DIR}/server.cert`)
//         },
//         app
//     );
// }

// const server = createServer();

// server.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//     console.log(`SSL ${useSSL ? 'enabled' : 'disabled'}`);
// });

const express = require('express');
const adminRouter = require("./routes/admin.router")

const PORT = process.env.PORT || 8080;

const app = express();

app.use("/api", adminRouter)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
