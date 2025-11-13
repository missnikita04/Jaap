// backend/models/Dashboard.js
import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
    count: { type: Number, default: 0 },
  rounds: { type: Number, default: 0 }
});

export default mongoose.model("Dashboard", dashboardSchema);
