import mongoose from "mongoose";

const countSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  count: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Count", countSchema);
