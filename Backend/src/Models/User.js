const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName:{
        type : String,
        required:true
    },
    lastName:{
        type : String,
        required:true
    },
    number:{
     type :Number,
     required:true,
     unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    },
    profilePic: {
        public_id: {
            type: String,
           
            default:""
        },
        url: {
            type: String,
           
            default:""
        }
    
    },
    verified:{
        type:Boolean,
        default:false
    }
})
const User = mongoose.model('User' , userSchema)
module.exports = User;