const express = require("express");
const router = express.Router();
const multer = require('multer');
const cloudinary = require("../Services/Cloudinary")// Cloudinary SDK
const streamifier = require('streamifier');

// Cloudinary configuration

// Multer configuration for file upload
// const storage = multer.memoryStorage();
const upload = multer();
let uploadFromBuffer = (req) => {

   return new Promise((resolve, reject) => {

     let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "UrbanCartelUserProfilePic"
      },
      (error, result) => {

        if (result) {
          resolve(result);
        } else {
          reject(error);
         }
       }
     );

     streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
   });

};

router.post("/uploadProfilePic", upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let result = await uploadFromBuffer(req);
    res.send(result);
    
  } catch (error) {
    console.error("Error occurred while uploading profile picture:", error);
    res.status(500).json({ error: "Failed to upload profile picture" });
  }
});

module.exports = router;



