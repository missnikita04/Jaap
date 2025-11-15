import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./Routes/auth.js";
import dashboardRoutes from './Routes/dashboard.js'
// import countRoutes from "./Routes/count.js";
// Serve React build folder
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=express();

app.use(express.json());

// 3️⃣ Serve React build
app.use(express.static(path.join(__dirname, '../Frontend/dist')));



app.use(cors({ 
  origin: "https://jaap-counter-cq7o.onrender.com",
   credentials: true 
  }));
//other middle ware
app.use(express.json());
let totalCount = 0;
mongoose.connect(process.env.MONGO_URI,{
     useNewUrlParser: true,
      useUnifiedTopology: true }).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


    //  Test route
app.get("/", (req, res) => {
  res.send("Backend working fine ");
});

app.use("/api/auth",authRoutes);
app.get("/api/count",(req,res)=>{

  res.json({totalCount});
})

app.post("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.json({ message: "Server working fine" });
});

// Route to receive count
app.use("/api/dashboard", dashboardRoutes);

// Fallback route for React SPA
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});
//mount dahsboard route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});