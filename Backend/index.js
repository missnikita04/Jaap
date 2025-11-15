import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./Routes/auth.js";
import dashboardRoutes from './Routes/dashboard.js';

dotenv.config();

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// CORS - allow your deployed frontend
app.use(cors({ 
  origin: "https://jaap-counter-cq7o.onrender.com", 
  credentials: true 
}));

// MongoDB connection
let totalCount = 0;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Serve React build folder (frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/api/count", (req, res) => {
    res.json({ totalCount });
});

app.post("/test", (req, res) => {
    console.log("✅ Test route hit");
    res.json({ message: "Server working fine" });
});

// Fallback route for React SPA - MUST BE LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
