const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model 
    required: true,
  },
  pId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model 
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // using a URL 
    required: true,
  },
});

const Cart = mongoose.model('Cart', cartItemSchema);

module.exports = Cart;
