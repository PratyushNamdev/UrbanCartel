const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const otpModel = require("../Models/OtpVerifications");
const nodemailer = require("nodemailer");
const secretKey = process.env.JJ_J;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "pratyushnamdev140@gmail.com",
    pass: "qwrawyscpgganeod",
  },
});
const sendOTPverificationEmail = async (_id, email, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: "pratyushnamdev140@gmail.com",
      to: email,
      subject: "Verify yout E-mail",
      html: `<p>Enter ${otp} in the app to verify</p>`,
    };
    const salt = await bcrypt.genSalt(10);
    const hashOTP = await bcrypt.hash(otp, salt);
    await otpModel.create({
      userId: _id,
      otp: hashOTP,
      createdAt: Date.now(),
      expiresOn: Date.now() + 360000,
    });

    await transporter.sendMail(mailOptions).then(() => {
      res.json({ needVerificationstatus: true, id: _id });
    });
  } catch (error) {
    res.json({ status: false, id: null });
  }
};
router.post(
  "/signup",
  [
    //validation of the data
    body("firstName").isLength({ min: 3 }),
    body("lastName").isLength({ min: 3 }),
    body("number").isInt({ min: 16 }).withMessage("enter valid age"),
    body("email").isEmail().withMessage("Please enter a valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be set of atleast 6 letters"),
  ],
  async (req, res) => {
    //cheching for any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.body)
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(401).send({ error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      //hashing the password
      const secPass = await bcrypt.hash(req.body.password, salt);
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        password: secPass,
      }).then((user) => {
        sendOTPverificationEmail(user._id, user.email, res);
      });
    } catch (err) {
      res.status(400).send({ error: "Some Error Occured" });
    }
  }
);
router.post("/verifyOTP", async (req, res) => {
   try {
    const { userId, otp, forPasswordReset } = req.body;
    if (!userId || !otp) {
      return res.json({ error: "Invalid request" });
    }

    let otpRecord = await otpModel.findOne({ userId });
   
    if (!otpRecord) {
      return res.json({
        error: "Email is already verified or not exist try by singin up again",
      });
    }
    if (otpRecord.expiresOn < Date.now()) {
      await otpModel.deleteMany({ userId });
      return res.json({
        error: "OTP expired",
      });
    }
    const validOTP = await bcrypt.compare(otp, otpRecord.otp);
    if (!validOTP) {
      return res.json({
        wrongOTP: true,
      });
    }

    if (!forPasswordReset) {
        await otpModel.deleteMany({ userId });
       await User.updateOne({ _id: userId }, { verified: true })
      const user = await User.findById(userId)
      const data = {
        user: {
          id: user._id,
        },
      };
      console.log(secretKey)
      let authToken = jwt.sign(data,secretKey);
     return res.json({ authToken, user , needVerificationstatus:false});
    }

    if (forPasswordReset) {
      await otpModel.deleteMany({ userId });
     return res.json({ resetPassword: true });
    }

    
  } catch (e) {
    res.json({ status: false });
  }
});

router.post(
  "/login",
  [body("email").isEmail().withMessage("Please enter a valid Email")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      console.log(req.body);
      let user = await User.findOne({ email });
      if (!user) {
        return res.send({ signUpRequired: true });
      }
      if(!user.verified){
     
        await otpModel.deleteMany({userId : user._id})
        return sendOTPverificationEmail(user._id , user.email , res);
        
      }
      //checking the password
      let check = await bcrypt.compare(password, user.password);
      if (!check) {
        return res.send({ wrongPassword :true });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      let authToken = jwt.sign(data,secretKey);
      res.json({ authToken, user , needVerificationstatus:false});
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Some Errored Occured" });
    }
  }
);


module.exports = router;
