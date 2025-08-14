import Goal from "../models/Goal.js";
import Fitness from "../models/Fitness.js";
import Nutrition from "../models/Nutrition.js";

// Helper: Check if goal recurrence requires reset
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

// Create new goal
export const addGoal = async (req, res) => {
  try {
    const { type, target, recurrence } = req.body;

    const goal = new Goal({
      user: req.user.id,
      type,
      target,
      recurrence: recurrence || "none",
      progress: 0,
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all goals for user
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    // Reset progress if recurrence has passed
    for (let goal of goals) {
      if (shouldResetGoal(goal)) {
        goal.progress = 0;
        await goal.save();
      }
    }

    res.json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update goal progress
export const updateGoal = async (req, res) => {
  try {
    const { progress } = req.body;

    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    if (goal.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    // For steps goal, only update progress (do not change target)
    if (
      goal.type === "steps" ||
      goal.type === "workout" ||
      goal.type === "nutrition" ||
      goal.type === "calories"
    ) {
      goal.progress = progress;
    }

    await goal.save();
    res.json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete goal
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (goal.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await goal.deleteOne();
    res.json({ message: "Goal deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
