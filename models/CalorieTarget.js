import mongoose from "mongoose";

const CalorieTargetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    target: Number,  
    date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
  },
  { timestamps: true }
);

export default mongoose.model("CalorieTarget", CalorieTargetSchema);
