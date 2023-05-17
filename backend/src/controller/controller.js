require("dotenv").config();
const Student = require("../models/Student");
const Driver = require("../models/Driver");
const generateToken = require("../middleware/generateJWT")
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgmail = require("@sendgrid/mail");
const API_KEY = "abcd";
sgmail.setApiKey(API_KEY);
const JWT_SECRET = "some secrets remain secret.";
const sinupdata = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // const {fname,lname,email,phone,pass,cpass}=req.body
  // if (!fname||!lname||!email||!phone||!pass||!cpass) {
  //      res.status(400);
  //      throw new Error("Please enter all the fields");
  // }
  try {
    if (req.body.value == 1) {
      let stu = await Student.findOne({ email: req.body.email });
      if (stu) {
        return res.status(500).send({ email: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.pass, salt);
      stu = await Student.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.value,
        pass: secPass,
      });
      res.send(stu);
      console.log("saving to student db");
    } else if (req.body.value == 2) {
      let dri = await Driver.findOne({ email: req.body.email });
      if (dri) {
        return res.status(500).send({ email: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.pass, salt);
      dri = await Driver.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.value,
        pass: secPass,
      });
      res.send(dri);
      console.log("saving to driver db");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
};

const authUser = async (req, res) => {
  try{
    const { email, pass } = req.body;
  const stu = await Student.findOne({ email });
  const dri = await Driver.findOne({email});
  if (stu && (await stu.matchPassword(pass))) {
    res.status(200).json({
      _id: stu._id,
      fname:stu.fname,
      lname:stu.lname,
      email: stu.email,
      role:stu.role,
      token: generateToken(stu._id),
    });
    
  }else if(dri && (await dri.matchPassword(pass))){
    res.status(200).json({
      _id:dri._id,
      fname:dri.fname,
      lname:dri.lname,
      email:dri.email,
      role:dri.role,
      token: generateToken(dri._id),
    });
  } 
  else {
    res.status(400);
    throw new Error("Invalid id or password");
  }
  }catch(err){
    res.status(400).send("user not found");
    console.log(err);
  }
  
};
const otpCheck = async (req, res) => {
  const { email } = req.body;
  const stu = await Student.findOne({ email });
  const secret = JWT_SECRET + stu.pass;
  const payload = {
    email: stu.email,
    id: stu._id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });

  const link = `http://localhost:3000/resetyourpass/${stu._id}/${token}`;

  console.log(link);
  // console.log(stu.email);
  res.send(email);
  const message = {
    to: email,
    from: "toobaamir50@gmail.com",
    subject: "otp email",
    text: "Hello from sendgrid",
    html: link,
  };
  sgmail
    .send(message)
    .then((response) => console.log("emailsent"))
    .catch((error) => console.log(error.message));
};
const resetfunc = async (req, res) => {
  const { pass, id, token } = req.body;

  console.log(pass);
  console.log("URL ID IS:", id);
  const stu = await Student.findOne({ _id: id });
  console.log("your id is:", stu._id);
  if (!stu) {
    res.send("Invalid Id");
    console.log("invalid id");
    return;
  }
  const secret = JWT_SECRET + stu.pass;
  try {
    const payloading = jwt.verify(token, secret);
    console.log(payloading);
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(pass, salt);
    let passupdate = await Student.findOneAndUpdate(
      { _id: id },
      { $set: { pass: secpass } }
    );
    console.log(passupdate);
    res.status(201).send("passupdate");
    return;
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = { sinupdata, authUser, otpCheck, resetfunc };
