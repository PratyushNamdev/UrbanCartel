const express = require('express');
const router = express.Router();
const Products = require("../Models/Products_Model");



router.get("/products", async (req, res) => {
   try {
    let data, totalDocs;
    const { sub_category, category, title, sort , id } = req.query;

    if(id){
      data =  await Products.findById(id);
      return res.json({data , totalDocs:1})
    }
    let page = 1;
    if (parseInt(req.query.page) > 0) {
      page = parseInt(req.query.page);
    }
    
    let query = {}; // Initialize an empty query object

    if (category) {
      query.category = category;
    } else if (sub_category) {
      query.sub_category = sub_category;
    } else if (title) {
      query.title = { $regex: new RegExp(`\\b${title}\\b`, "i") };
    }

    // Check if sort is provided in the query
    if (sort == "price-asc") {
      data = await Products.find(query)
        .sort({ selling_price_numeric: 1 })
        .skip((page - 1) * 10)
        .limit(10);
    } else if (sort == "price-desc") {
      data = await Products.find(query)
        .sort({ selling_price_numeric: -1 })
        .skip((page - 1) * 10)
        .limit(10);
    } else {
      // If no sort value is provided, retrieve unsorted data
      data = await Products.find(query)
        .skip((page - 1) * 10)
        .limit(10);
    }

    // Count total documents based on the query
    totalDocs = await Products.countDocuments(query);

    res.json({success:true ,  totalDocs, data });
  } catch (e) {
    res.json({ error: true , message:"Internal Server Error..." });
  }
});


module.exports = router;