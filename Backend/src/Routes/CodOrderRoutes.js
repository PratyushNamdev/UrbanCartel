const express = require("express");
const Cart = require("../Models/Cart_Model");
const Order = require("../Models/Orders_Model");
const User = require("../Models/User");
const DecodingToken = require("../Middleware/DecodingToken");
const router = express.Router();
const {transporter, setOrderPlacedMailOption} = require("../Services/Nodemailer_Transporter");
router.post("/cashOnDelivery", DecodingToken, async (req, res) => {
 try{ const { cartItems, selectedAddress } = req.body;
  if (req.user.id !== selectedAddress.userId) {
    return res.json({ error: true, message: "Access Denied." });
  }
  const listItems = await Cart.find({ userId: req.user.id });
  if (!listItems) {
    return res.json({ error: true, message: "Access Denied." });
  }
let orderItems =[];
 listItems.map( (item) => {
    const cartItem = cartItems.find(
      (obj) => obj._id.toString() === item._id.toString()
    );
   if(cartItem){
    const { _id, title, price, amount, image } = cartItem;
       orderItems.push({productId: _id, title, price, amount, image })
   } 
  });
  let totalAmt = orderItems.reduce((total, element) => total + element.price * element.amount, 0);
  await Order.create({
    userId: req.user.id,
    paymentStatus: "pending",
    deliveryStatus: "pending",
    orderItems,
    deliveryCost: totalAmt<=500 ? 40 : 0,
    address: {
      name: selectedAddress.name,
      mobileNumber: selectedAddress.mobileNumber,
      mainAddress: selectedAddress.mainAddress,
      areaAddress: selectedAddress.areaAddress,
      landmark: selectedAddress.landmark ? selectedAddress : "",
      pincode: selectedAddress.pincode,
      townOrCity: selectedAddress.townOrCity,
      state: selectedAddress.state,
    },
  })
  await Cart.deleteMany({ userId: req.user.id })
  let productListHTML = '';
  orderItems.forEach((item) => {
    productListHTML += `
      <tr>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.amount}</td>
      </tr>
    `;
  });
  const user = await User.findById(req.user.id);
  const mailOptions = setOrderPlacedMailOption(user.email , productListHTML , totalAmt);
  await transporter.sendMail(mailOptions).then(()=>{
    console.log("Order placed email sent successfully!")
  })
  res.json({ success: true });
}catch(e){
    console.log(e)
  return res.json({error:true , message:"Internal Server Error"})
}
});

module.exports = router;
