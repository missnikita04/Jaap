import express from "express";
import { verifyToken } from "../Middleware/authMiddleware.js";

const router =express.Router();

router.get("/",verifyToken,(req,res)=>{
    res.json({
        message:"welcome to the protected dashboard",
        userId:req.user.id,
    })

})
export default router

