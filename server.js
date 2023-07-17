const express = require("express")
const cors = require("cors")
const router = require("./routes/admin.router")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", router)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT} sucessfully !!!`)
})