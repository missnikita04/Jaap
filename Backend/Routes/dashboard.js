// backend/Routes/dashboard.js
import express from "express";
import Dashboard from "../models/Dashboard.js";
import User from '../models/User.js'
import { verifyToken } from '../Middleware/authMiddleware.js'; 
const router = express.Router();

// GET dashboard (total count + rounds + message)
router.get("/",verifyToken, async (req, res) => {
 try {
    const userId = req.user.id; // decoded from JWT
     // 🧩 Find the actual user to get username
    const currentUser = await User.findById(userId).select("username");
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let dash = await Dashboard.findOne({ userId });

    if (!dash) {
      dash = new Dashboard({ userId, count: 0, rounds: 0 });
      await dash.save();
    }

    res.json({
      message: `Welcome to your Jaap Dashboard`,
 username: currentUser.username,      count: dash.count,
      rounds: dash.rounds,
    });
  } catch (err) {
    console.error("❌ Error in /api/dashboard:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST increment count (protected)
router.post("/count", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const increment = req.body.count || 1;

    let dash = await Dashboard.findOne({ userId });
    if (!dash) dash = new Dashboard({ userId, count: 0, rounds: 0 });

    dash.count += increment;
    if (dash.count >= 108) {
      dash.rounds += Math.floor(dash.count / 108);
      dash.count = dash.count % 108;
    }

    await dash.save();

    res.json({
      message: "Count updated!",
      count: dash.count,
      rounds: dash.rounds,
    });
  } catch (err) {
    console.error("❌ Error in /count:", err);
    res.status(500).json({ error: err.message });
  }
});
// POST increment count
export default router;
