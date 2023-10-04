const express = require('express');
require('dotenv').config()
const app = express();
const port = 5000;
const main = require('./src/Config/ConnectToDB');
const cors = require('cors');
app.use(express.json());
app.use(cors());
main();
app.use("/api/product" , require("./src/Routes/Product"));
app.use("/api/authentication" , require("./src/Routes/AuthRoutes"));
app.listen(port , '0.0.0.0' ,()=>{
    console.log("Server is running on http://localhost:"+port)
})