const express = require('express');
const router = express.Router();
const Order = require("../Models/Orders_Model");
const DecodingToken = require("../Middleware/DecodingToken")
router.get("/getOrderItems" , DecodingToken,async (req , res)=>{

    try{
        const orderItems = await Order.find({userId:req.user.id});
        res.json({success:true , orderItems})
    }
    catch(e){
       res.status(500).json({error:true , message:"Internal Server Error"})
    }

})
module.exports = router;

