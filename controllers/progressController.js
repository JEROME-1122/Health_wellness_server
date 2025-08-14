import Nutrition from "../models/Nutrition.js";
import Fitness from "../models/Fitness.js";
import Goal from "../models/Goal.js";
import mongoose from "mongoose";

// Helper to get start of today
const getTodayStart = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// Helper: Check if recurring goal should reset
const shouldResetGoal = (goal) => {
  if (goal.recurrence === "none") return false;

  const now = new Date();
  const lastUpdated = new Date(goal.updatedAt);

  switch (goal.recurrence) {
    case "daily":
      return now.toDateString() !== lastUpdated.toDateString();
    case "weekly": {
      const weekNow = getWeekNumber(now);
      const weekLast = getWeekNumber(lastUpdated);
      return weekNow !== weekLast;
    }
    case "monthly":
      return (
        now.getMonth() !== lastUpdated.getMonth() ||
        now.getFullYear() !== lastUpdated.getFullYear()
      );
    default:
      return false;
  }
};

// Helper: Get ISO week number
const getWeekNumber = (d) => {
  d = new Date(d);
  const oneJan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
};

export const getProgress = async (req, res) => {
  try {
  const userId = new mongoose.Types.ObjectId(req.userId);
    const today = getTodayStart();

    // Calories Intake Today
    const intakeAgg = await Nutrition.aggregate([
      { $match: { user: userId, date: { $gte: today } } },
      {
        $group: {
          _id: null,
          totalIntake: { $sum: "$calories" },
          totalProtein: { $sum: "$protein" },
          totalCarbs: { $sum: "$carbs" },
          totalFat: { $sum: "$fat" },
        },
      },
    ]);

    // Calories Burned Today
    const burnAgg = await Fitness.aggregate([
      { $match: { user: userId, date: { $gte: today } } },
      { $group: { _id: null, totalBurn: { $sum: "$caloriesBurned" } } },
    ]);

    const totalIntake = intakeAgg[0]?.totalIntake || 0;
    const totalBurn = burnAgg[0]?.totalBurn || 0;
    const totalProtein = intakeAgg[0]?.totalProtein || 0;
    const totalCarbs = intakeAgg[0]?.totalCarbs || 0;
    const totalFat = intakeAgg[0]?.totalFat || 0;

    // Fetch all goals
    const goals = await Goal.find({ user: userId });

    const dashboardGoals = {};
    goals.forEach((goal) => {
      // Reset recurring goal if needed
      if (shouldResetGoal(goal)) {
        goal.progress = 0;
        goal.save();
      }
      dashboardGoals[goal.type] = {
        target: goal.target,
        progress: goal.progress,
      };
    });

    res.json({
      calories: {
        intake: totalIntake,
        burn: totalBurn,
        net: totalIntake - totalBurn,
        goal: dashboardGoals.calories || null,
      },
      stepsGoal: dashboardGoals.steps || null,
      workoutGoal: dashboardGoals.workout || null,
      nutritionGoal: {
        calories: dashboardGoals.nutrition?.target || null,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
        progress: dashboardGoals.nutrition?.progress || null,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
