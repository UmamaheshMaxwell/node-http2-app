const express = require('express');
const router = express.Router();
const multer = require('../helpers/multer');
const users = require("../users.json")


router.get("/admin", async (req, res) => {  
    try{
        console.log('Added try catch block')
      return  res.json({message: "Welcome to HTTP2 API"})
    }  catch (ex){
        return res.status(500).send(ex.message)
    }
})

router.get("/users", (req, res) => {
    try{
        return  res.json(users)
      }  catch (ex){
          return res.status(500).send(ex.message)
      }
})

router.post("/uploadFile", multer.multerFileUpload.single('file'), async (req, res) => {
    const filePath = req.file.path;
    const fileName = req.file.filename;
    res.status(200).send({ success: `${fileName} Uploaded Sucessfully to ${filePath}` });
});

module.exports = router