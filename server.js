const http2 = require("http2")
const os = require("os")


const PORT = process.env.PORT || 8080
const addr = `0.0.0.0:${PORT}`


const server = http2.createServer()

server.on("stream", (stream, headers) => {
  stream.respond({
    'content-type': 'text/plain',
    ':status': 200
  })
  console.log(headers)
  stream.end(`This requested is served over HTTP2 protocol using NodeJS`)
})

server.listen(PORT, ()=>{
  console.log(`Server is listening at ${PORT}`)
})

