const Multer = require('multer');

exports.multerFileUpload = Multer({
    storage: Multer.diskStorage({
      // Destination to store image     
      destination: 'images',
      filename: (req, file, callback) => {
        let date = new Date();
     
        callback(null, 'images-' + `${date.getTime()}-${file.originalname.toLowerCase()}`)
      },
    }),
    limits: {
      fileSize: 1000 * 1024 * 1024, // Maximum file size is 1GB
    }
}) 