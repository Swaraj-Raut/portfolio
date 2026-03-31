const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER
router.post("/register", async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.json("Missing fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username: username,
    email: email,
    password: hashedPassword
  });

  await user.save();

  res.json("User Registered Successfully");

});



// LOGIN
router.post("/login", async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.json("Email and password required");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.json("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json("Invalid password");
  }

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({
    message: "Login Successful",
    token: token
  });

});


module.exports = router;