import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["steps", "calories", "workout", "nutrition"],
      required: true,
    },
    target: { type: Number, required: true },
    progress: { type: Number, default: 0 },
    recurrence: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly"],
      default: "none",
    },
    startDate: { type: Date, default: Date.now },
    endDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
