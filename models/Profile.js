import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  preferences: String,
  weight: { type: Number, default: 70 },// for calorie calculation
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Profile", ProfileSchema);
