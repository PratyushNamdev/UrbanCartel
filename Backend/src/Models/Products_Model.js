const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
 
  

  actual_price:{
    type:String,
    required:true
  },
  average_rating:{
    type:String
  },
  brand:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  crawled_at:{
    type:String, 
  },
  description:{
    type:String,
    required:true
  },
  discount:{
    type:String,
  },
  images:{
    type:Array,
    required:true
  },
  out_of_stock:{
    type:Boolean,
    required:true
  },
  pid:{
    type:String,
    required:true
  },
  product_details:{
    type: Array,
    required:true
  },
  seller:{
    type:String,
    required:true
  },
  selling_price_numeric:{
    type:Number,
    required:true
  },
  sub_category:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },

});
module.exports = mongoose.model('Products' , ProductSchema);