import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  resetOtp: { type: Number, default: 0 },
  resetOtpExpireAt: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('User', UserSchema);

