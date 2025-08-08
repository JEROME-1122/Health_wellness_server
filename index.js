import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import fitnessRoutes from "./routes/fitness.js";
import nutritionRoutes from "./routes/nutrition.js";
import goalsRoutes from "./routes/goals.js";
import profileRoutes from "./routes/profile.js";
import progressRoutes from "./routes/progress.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import passwordRoutes from './routes/password.js';
dotenv.config();

connectDB();

const app = express();
app.use(
  cors({
    origin: "https://health-wellnes-s.netlify.app",
   credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Health and Wellness API is running...");
});

// Public Routes
app.use("/api/auth", authRoutes);
app.use('/api/password', passwordRoutes);
// Protected Routes
app.use(authMiddleware);
app.use("/api/fitness", fitnessRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/progress", progressRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




