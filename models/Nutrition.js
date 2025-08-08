
import mongoose from 'mongoose';

const NutritionSchema = new mongoose.Schema({
  item: String,
  calories: Number,
  proteins: Number,
  carbs: Number,
  fats: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Nutrition', NutritionSchema);
