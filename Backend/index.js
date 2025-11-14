import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import dashboardRoutes from './Routes/dashboard.js'
// import countRoutes from "./Routes/count.js";

dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "SET" : "MISSING");


const app=express();
app.use(cors({ 
  origin: "https://jaap-counter-cq7o.onrender.com",
   credentials: true 
  }));
//other middle ware
app.use(express.json());
let totalCount = 0;
mongoose.connect(process.env.MONGO_URI,{
     useNewUrlParser: true,
      useUnifiedTopology: true }).then(()=>{
    console.log("mogno atlas  connetced")})
    .catch(err=>console.log(err));

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


//mount dahsboard route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});