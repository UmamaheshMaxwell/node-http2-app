const express = require('express');
const router = express.Router();
const multer = require('../helpers/multer');
const users = require("../users.json")


router.get("/admin", async (req, res) => {    
    res.json({message: "Welcome to HTTP2 API"})
})

router.get("/users", (req, res) => {
    res.json(users)
})

router.post("/uploadFile", multer.multerFileUpload.single('file'), async (req, res) => {
    const filePath = req.file.path;
    const fileName = req.file.filename;
    res.status(200).send({ success: `${fileName} Uploaded Sucessfully to ${filePath}` });
});

module.exports = router