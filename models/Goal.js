import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,              // Add this
    totalSteps: Number,         // Add this
    stepsCompleted: Number,     // Add this
    progress: Number
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);