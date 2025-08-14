import mongoose from "mongoose";

const fitnessSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workoutType: { type: String, required: true }, // running, cycling, strength
  duration: { type: Number, required: true }, // in minutes
  caloriesBurned: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Fitness", fitnessSchema);
