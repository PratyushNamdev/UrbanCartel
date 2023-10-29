const express = require("express");
const router = express.Router();
const Address = require("../Models/Address_Model");
const DecodingToken = require("../Middleware/DecodingToken");
const { body, validationResult } = require("express-validator");

router.get("/fetchAddress", DecodingToken, async (req, res) => {
  try {
    const address = await Address.find({ userId: req.user.id });
    res.json({ address });
  } catch (e) {
    res.json({ error: true }, { Message: "Internal Server Error" });
  }
});
router.post(
  "/addNewAddress",
  DecodingToken,
  [
    //validation of the data
    body("mobileNumber").isLength({ min: 10 }),
    body("mainAddress").isLength({ min: 3 }),
    body("areaAddress").isLength({ min: 2 }).withMessage("Enter valid address"),
    body("pincode").isLength({ min: 6 }).withMessage("enter valid Pincode"),
    body("townOrCity").isLength({ min: 3 }).withMessage("Enter valid address"),
    body("state").isLength({ min: 2 }).withMessage("Enter valid address"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error :true , message: errors.array() });
    }
    const {
      userId,
      name,
      mobileNumber,
      mainAddress,
      areaAddress,
      pincode,
      townOrCity,
      landmark,
      state,
    } = req.body;
    try {
      if (userId !== req.user.id) {
        return res.status(401).json({ error: true , message:"Server Access Denied"});
      }
      await Address.create({
        userId,
        name,
        mobileNumber,
        mainAddress,
        areaAddress,
        pincode,
        townOrCity,
        landmark: landmark ? landmark : "",
        state,
      }).then((address) => {
        res.json({ address, success: true });
      });
    } catch (e) {
      return res.status(500).json({ error:true , message: "Internal Server Error" });
    }
  }
);
router.put(
  "/updateAddress/:id",
  DecodingToken,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   try{ const id = req.params.id;
    const {
      userId,
      name,
      mobileNumber,
      mainAddress,
      areaAddress,
      pincode,
      townOrCity,
      landmark,
      state,
    } = req.body;
    
    let address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ error: true , message:"NOT FOUND"});
    }
    if (address.userId.toString() !== userId) {
      return res.status(401).json({ error: true , message:"Access Denied" });
    }
    const newAddress = {};
    if (name) {
      newAddress.name = name;
    }
    if (mobileNumber) {
      newAddress.mobileNumber = mobileNumber;
    }
    if (mainAddress) {
      newAddress.mainAddress = mainAddress;
    }
    if (areaAddress) {
      newAddress.areaAddress = areaAddress;
    }
    if (pincode) {
      newAddress.pincode = pincode;
    }
    if (landmark === "" || landmark) {
      
      newAddress.landmark = landmark;
    }
    if (townOrCity) {
      newAddress.townOrCity = townOrCity;
    }
    if (state) {
      newAddress.state = state;
    }
    address = await Address.findByIdAndUpdate(
      id,
      { $set: newAddress },
      { new: true }
    );
    res.json({success:true , address});
  }catch(e){
    return res.status(500).json({ error: true , message:"Something went wrong" });
  }
  }
);

module.exports = router;
