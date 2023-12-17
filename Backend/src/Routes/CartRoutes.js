const express = require("express");
const router = express.Router();
const Cart = require("../Models/Cart_Model");
const DecodingToken = require("../Middleware/DecodingToken");
router.post("/addToCart", DecodingToken, async (req, res) => {
  const { pId, userId, title, price, image } = req.body;
  if (userId != req.user.id) {
    return res.status(401).json({ error: true  , message:"Access Denied"});
  }
  try {
    let cartItem = await Cart.findOne({ userId, pId });
    if (cartItem) {
      cartItem.amount = cartItem.amount + 1;
      await cartItem.save();
      return res.json({ Updated: true, id: cartItem._id });
    } else {
      cartItem = await Cart.create({
        userId,
        pId,
        title,
        price,
        image,
        amount: 1, // Set the initial amount to 1
      });
      
      return res.json({ Added: true , cartItem});
    }
  } catch (e) {
    return res.status(500).json({ error: true , message:"Internal server error" });
  }
});
router.get("/fetchCartProducts", DecodingToken, async (req, res) => {
  try {
    let cartItems = await Cart.find({ userId: req.user.id });
    res.json({ cartItems });
  } catch (e) {
    return res.status(500).json({ error: true , message:"Internal server error" });
  }
});
router.put("/decreaseCartProduct", DecodingToken, async (req, res) => {
  const { pId, userId, removeProduct } = req.body;
  if (userId != req.user.id) {
    return res.status(401).json({ error: true , message :"Access Denied" });
  }
  try {
    let cartItem = await Cart.findOne({ userId, pId });
    if (!cartItem) {
     return res.status(404).json({ error: true , message:"Not Found" });
    }
    if (removeProduct) {
      await Cart.deleteOne({ _id: cartItem._id });
      return res.json({ Removed: true, message: "Product is removed" ,  id : cartItem._id});
    } else {
      cartItem.amount -= 1;
      if (cartItem.amount <= 0) {
        await Cart.deleteOne({ _id: cartItem._id });
        return res.json({ Removed: true, message: "Product is removed" , id : cartItem._id});
      } else {
        await cartItem.save();
        return res.json({ Decreased: true, id : cartItem._id });
      }
    }
  } catch (e) {
    return res.status(500).json({ error: true , message:"Internal server error" });
  }
});
router.delete("/clearCart" , DecodingToken , async (req , res)=>{
  try{const {userId} = req.body;
  console.log(userId)
  if (userId != req.user.id) {
    return res.status(401).json({ error: true  , message:"Access Denied"});
  }
  const clear = await Cart.deleteMany({userId});
  res.json({cleared:true , clear});
}catch(e){
  return res.status(500).json({ error: true , message:"Internal server error" });
}

})
module.exports = router;
