const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1/UrbanCartel').then(()=>{
        console.log("Connected to the DB");
    }).catch((e)=>{
        console.log("Connection to the DB failed ! " + e);
    });
}
module.exports = main;