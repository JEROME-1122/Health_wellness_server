
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  preferences: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Profile', ProfileSchema);
