const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
    pId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
})
const OrderItemSchema = new Schema({
    secretKey:{
        type:String,
        required:true,    
    },
    products:[productSchema]
});
const OrderItems = mongoose.model("OrderItems" , OrderItemSchema);
module.exports = OrderItems;