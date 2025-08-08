import mongoose from 'mongoose';

const FitnessSchema = new mongoose.Schema({
  type: String,
  duration: Number,
  distance: Number,
  calories: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Fitness', FitnessSchema);
