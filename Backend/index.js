const express = require('express');
const app = express();
const port = 5000;
const main = require('./src/Config/ConnectToDB');
const Products = require('./src/Models/Products_Model');
const cors = require('cors');
app.use(express.json());

app.use(cors());
const mongoose = require('mongoose')
main();
app.use("/api/product" , require("./src/Routes/Product"));
app.listen(port , ()=>{
    console.log("Server is running on http://localhost:"+port)
})