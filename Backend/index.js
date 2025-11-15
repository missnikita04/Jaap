import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import dashboardRoutes from "./Routes/dashboard.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "https://jaap-counter-cq7o.onrender.com", 
    "http://localhost:5173"
  ],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err));

// API ROUTES ONLY
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
