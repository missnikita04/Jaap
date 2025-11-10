import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import dashboardRoutes from './Routes/dashboard.js';
// import countRoute from './Routes/count.js'
// import countRoutes from "./Routes/count.js";

dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "SET" : "MISSING");


const app=express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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

// Route to receive count
app.post("/api/count", (req, res) => {
  const { count } = req.body;
  totalCount += count;
  console.log("Received count:", count, "Total count:", totalCount);
  res.json({ message: "Count received", totalCount });
});



//mount dahsboard route
app.use("/api/dashboard",dashboardRoutes);

app.listen(5000,()=>{
    console.log("server running on port 5000");
})

