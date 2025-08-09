import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,             
    totalSteps: Number,        
    stepsCompleted: Number,     
    progress: Number
  },
  { timestamps: true }
);


export default mongoose.model("Goal", goalSchema);
