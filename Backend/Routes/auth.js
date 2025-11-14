import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import nodemailer from "nodemailer"; 
const router = express.Router();






// -------Sign up Route---------/
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// Login
router.post("/login", async (req, res) => {
  console.log("Login route hit");
  console.log("JWT Secret:", process.env.JWT_SECRET ? "SET" : "MISSING");
  const { email, password } = req.body;
  try {
    //chekc if user is exist
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    //compare pasword
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) return res.status(400).send("Invalid password");

    //generate jwt token
    console.log("now gemerate the jswt token");
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("jwt token set");
    res.json({ token, userId: user._id, username: user.username });
    console.log("res the user");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// ✅ STEP 1: Send OTP
router.post("/forgot-password", async (req, res) => {
  try{
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Email not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASSWORD, // use Gmail app password
    },
  
})

 await transporter.sendMail({
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
  });
   res.json({ msg: "OTP sent to your email" });
   }catch(err){
   console.error("❌ Forgot Password Error:", err);
    res.status(500).json({ msg: "Internal Server Error", error: err.message })
}

});


// ✅ STEP 2: Verify OTP and Reset Password
router.post("/reset-password", async (req, res) => {
  try{
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid email" });
   console.log("📨 Received email:", email);
    console.log("🧾 Received OTP:", otp);
    console.log("💾 Stored OTP:", user.otp);
    console.log("⌛ Expiry:", user.otpExpires, "Now:", Date.now());
    if (!user.otp) return res.status(400).json({ msg: "No OTP found for this user" });

  if (user.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });
  if (user.otpExpires < Date.now()) return res.status(400).json({ msg: "OTP expired" });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.otp = null;
  user.otpExpires = null;
  await user.save();
console.log("✅ Password reset successful");
    res.json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error("❌ Reset Password Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});




export default router;
