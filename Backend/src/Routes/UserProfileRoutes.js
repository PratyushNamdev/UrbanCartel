const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const cloudinary = require("../Services/Cloudinary")// Cloudinary SDK
const streamifier = require('streamifier');
const DecodingToken = require("../Middleware/DecodingToken");


router.put("/editProfile",DecodingToken, async (req, res) => {
  try {
   const {firstName , lastName , newProfilePic} = req.body;
   
   const user = await User.findById(req.user.id);
   if(!user){
    return res.json({error:true , message:"User Not Found"});
   }
   const newData = {};
   if(firstName){
    newData.firstName = firstName;
   }
   if(lastName){
    newData.lastName = lastName;
   }
   if(typeof newProfilePic === 'string' && newProfilePic !== ""){
    
    const ImgId =  user.profilePic.public_id;
    console.log(ImgId)
            if (ImgId) {
                await cloudinary.uploader.destroy(ImgId);
            }

            const newImage = await cloudinary.uploader.upload(newProfilePic, {
                folder: "UrbanCartelUserProfilePic",
               
            });
             console.log(newImage)
            newData.profilePic = {
                public_id: newImage.public_id,
                url: newImage.secure_url
            }
   }
   const updatedProfile = await User.findOneAndUpdate(  { _id: req.user.id }, newData , {new:true});
   res.json({success:true , updatedProfile});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true , message:"Failed to upload the profile picture" });
  }
});

module.exports = router;



