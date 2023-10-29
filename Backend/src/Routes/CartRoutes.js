const express = require("express");
const router = express.Router();
const Cart = require("../Models/Cart_Model");
const DecodingToken = require("../Middleware/DecodingToken");
router.post("/addToCart", DecodingToken, async (req, res) => {
  const { pId, userId, title, price, image } = req.body;
  if (userId != req.user.id) {
    return res.status(401).json({ accessDenied: true });
  }
  try {
    let cartItem = await Cart.findOne({ userId, pId });
    if (cartItem) {
      cartItem.amount = cartItem.amount + 1;
      await cartItem.save();
      return res.json({ success: true, cartItem });
    } else {
      cartItem = await Cart.create({
        userId,
        pId,
        title,
        price,
        image,
        amount: 1, // Set the initial amount to 1
      });
      
      return res.json({ success: true});
    }
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/fetchCartProducts", DecodingToken, async (req, res) => {
  try {
    let cartItems = await Cart.find({ userId: req.user.id });
    res.json({ cartItems });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/decreaseCartProduct", DecodingToken, async (req, res) => {
  const { pId, userId, removeProduct } = req.body;
  if (userId != req.user.id) {
    return res.status(401).json({ accessDenied: true });
  }
  try {
    let cartItem = await Cart.findOne({ userId, pId });
    if (!cartItem) {
      res.status(404).json({ error: "Item Not Found" });
    }
    if (removeProduct) {
      await Cart.deleteOne({ _id: cartItem._id });
      return res.json({ success: true, message: "Product is removed" });
    } else {
      cartItem.amount -= 1;
      if (cartItem.amount <= 0) {
        await Cart.deleteOne({ _id: cartItem._id });
        return res.json({ success: true, message: "Product is removed" });
      } else {
        await cartItem.save();
        return res.json({ success: true, cartItem });
      }
    }
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/clearCart" , DecodingToken , async (req , res)=>{
  const {userId} = req.body;
  console.log(userId)
  if (userId != req.user.id) {
    return res.status(401).json({ accessDenied: true });
  }
  const clear = await Cart.deleteMany({userId});
  res.json({success:true , clear});
  console.log(clear)
})
module.exports = router;
