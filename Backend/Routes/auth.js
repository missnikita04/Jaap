import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();






// -------Sign up Route---------/
router.post("/signup", async (req, res) => {
  console.log("📩 Signup route hit");
  console.log("Request body:", req.body);
  const { username, email, password } = req.body;
  console.log("receave data");
  try {
    if (!username || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log(" About to save user:", user);
    await user.save();
    console.log("user created ");
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("❌ Signup Error:", err.message);
    res.status(400).json({ error: err.message });
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

export default router;
