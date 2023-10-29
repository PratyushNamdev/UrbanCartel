const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
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
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
