import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foodName: { type: String, required: true },
  quantity: { type: Number, required: true }, // in grams
  calories: { type: Number, required: true },
  protein: Number,
  carbs: Number,
  fat: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Nutrition", nutritionSchema);
