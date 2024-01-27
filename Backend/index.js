const express = require("express");
// const ngrok = require("ngrok");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

const main = require("./src/Config/ConnectToDB");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
//dont change the position of next line
app.use("/api/payment", require("./src/Routes/StripeRoutes"));
app.use(express.json({ limit: "50mb" }));
main().catch(console.dir);
app.use("/api/product", require("./src/Routes/Product"));
app.use("/api/authentication", require("./src/Routes/AuthRoutes"));
app.use("/api/cart", require("./src/Routes/CartRoutes"));
app.use("/api/address", require("./src/Routes/AddressRoutes"));
app.use("/api/payment", require("./src/Routes/CodOrderRoutes"));
app.use("/user", require("./src/Routes/UserProfileRoutes"));
app.use("/api/order", require("./src/Routes/OrderItemsRoute"));
// app.use((req, res, next) => {
//   if (req.headers["NGROK_SECRET"] === "yoursecretvalue") {
//     res.setHeader("ngrok-skip-browser-warning", "skip-browser-warning");
//   }
//   next();
// });

// app.listen(port, "0.0.0.0", async () => {
//   const ngrokUrl = await ngrok.connect({
//     addr: port,
//     authtoken: "2XwxzFoTNTwGl36P6MTHYRJz3Ng_2C8aALYTvucjci2keJuiv",
//     response_header_add: [
//       "ngrok-skip-browser-warning",
//       "dial-duration:${.backend.dial_duration}",
//     ],
//   });

//   console.log("Server is running on:");
//   console.log(`http://localhost:${port}`); // Local URL
//   console.log(ngrokUrl); // Public URL provided by ngrok
// });

    app.listen(port , '0.0.0.0' ,()=>{
        console.log("Server is running on http://localhost:"+port)
    })