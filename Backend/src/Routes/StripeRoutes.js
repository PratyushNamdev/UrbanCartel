const express = require("express");
const Cart = require("../Models/Cart_Model");
const router = express.Router();
const OrderItems = require("../Models/OrderItems_Model");
const Order = require("../Models/Orders_Model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const DecodingToken = require("../Middleware/DecodingToken");
const User = require("../Models/User");
const {transporter , setOrderPlacedMailOption} = require("../Services/Nodemailer_Transporter");
// Create a Stripe Checkout session for payment
router.post(
  "/checkout-session",
  express.json(),
  DecodingToken,
  async (req, res) => {
    try {
      // Retrieve cart items for the authenticated user
      let specificItems = [];
      const storeItems = await Cart.find({ userId: req.user.id });

      // Create an array of line items for the Stripe session
      const lineItems = req.body.cartItems.map((item) => {
        const storeItem = storeItems.find(
          (obj) => obj._id.toString() === item._id
        );
        if (storeItem) {
          specificItems.push({
            pId: storeItem.pId,
            title: storeItem.title,
            price: storeItem.price,
            amount: storeItem.amount,
            image: storeItem.image ? storeItem.image : "",
          });
        }
        return {
          price_data: {
            currency: "INR",
            product_data: {
              name: storeItem.title,
              images: [storeItem.image],
            },
            unit_amount: storeItem.price * 100,
          },
          quantity: item.amount,
        };
      });
      //to add delivey amount

      let totalAmt = lineItems.reduce(
        (total, element) =>
          total + element.price_data.unit_amount * element.quantity,
        0
      );
      function generateSecretKey() {
        return [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
      }
      
      const secretKey = generateSecretKey();
      
      await OrderItems.create({
        secretKey,
        products: specificItems,
      });
      if (totalAmt / 100 <= 500) {
        lineItems.push({
          price_data: {
            currency: "INR",
            product_data: {
              name: "Delivery Charge",
            },
            unit_amount: 40 * 100,
          },
          quantity: 1,
        });
      }
      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        metadata: {
          userId: req.user.id,
          address: JSON.stringify(req.body.selectedAddress),
          secretKey,
        },
      });

      // Respond with the session URL for client-side redirection
      res.json({ success: true, url: session.url });
    } catch (error) {
      // Handle errors with a more informative message
      console.error("Error in /checkout-session:", error);
      res
        .status(500)
        .json({ error: true, message: "Failed to create a checkout session." });
    }
  }
);

const endpointSecret = "whsec_ALBSoDlgaSPbe3IUBQArXy6Xxs88E37e";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    req.headers["ngrok-skip-browser-warning"] = "true";
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const address = JSON.parse(event.data.object.metadata.address);
        const userId = event.data.object.metadata.userId;
        const secretKey = event.data.object.metadata.secretKey;
        const orderProduct = await OrderItems.find({ secretKey });
        console.log(orderProduct.products);
        let totalAmt = 0
        const orderItems = orderProduct[0].products.map((item)=>{
          console.log(item)
          totalAmt += item.price * item.amount;
          return{
            productId: item.pId,
            title:item.title,
            price:item.price,
            amount:item.amount,
            image:item.image
          }
        })
        await Order.create({
          userId,
          paymentStatus: "completed",
          deliveryStatus: "pending",
          orderItems,
          deliveryCost: totalAmt <= 500 ? 40 : 0,
          address: {
            name: address.name,
            mobileNumber: address.mobileNumber,
            mainAddress: address.mainAddress,
            areaAddress: address.areaAddress,
            landmark: address.landmark ? address : "",
            pincode: address.pincode,
            townOrCity: address.townOrCity,
            state: address.state,
          },
        });
        const user = await User.findById(userId);
        const email = user.email;
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
    
       const mailOptions = setOrderPlacedMailOption(email , productListHTML ,totalAmt);
        await transporter.sendMail(mailOptions).then(()=>{
          console.log('Order placed email sent successfully!');
        })
      
        await Cart.deleteMany({ userId });
        await OrderItems.deleteMany({secretKey})

        return res.json({ success: true });
      }
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
        return res.json({ default: true });
    }

    // Return a 200 response to acknowledge receipt of the event
  }
);

module.exports = router;
