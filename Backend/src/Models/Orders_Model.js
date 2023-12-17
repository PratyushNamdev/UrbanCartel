const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String, // using a URL
  },
});
const OrderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  orderItems: [CartItemSchema],
  paymentStatus: {
    type: String,
    required: true,
    enum: ["pending", "completed"],
    default: "pending",
  },
  deliveryStatus: {
    type: String,
    required: true,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
 deliveryCost:{
    type:Number,
    default:0,
 },
  address: {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    mainAddress: {
      type: String,
      required: true,
    },
    areaAddress: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    pincode: {
      type: String,
      required: true,
    },
    townOrCity: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  created_At: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
