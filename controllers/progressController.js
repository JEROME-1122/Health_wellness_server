import Goal from '../models/Goal.js';
import Fitness from '../models/Fitness.js';
import mongoose from 'mongoose';

export const getProgress = async (req, res) => {
  try {
    // Find the "Steps" goal — case-insensitive, partial match
    const stepsGoal = await Goal.findOne({
      user: req.userId,
      title: { $regex: /steps/i } // matches "Steps", "Daily Steps", etc.
    });

    const currentSteps = stepsGoal?.stepsCompleted || 0;
    const targetSteps = stepsGoal?.totalSteps || 0;

    // Total workouts logged by the user
    const workouts = await Fitness.countDocuments({ user: req.userId });

    // Total calories burned from workouts
    const caloriesData = await Fitness.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.userId) } },
      { $group: { _id: null, total: { $sum: "$calories" } } }
    ]);

    const totalCalories = caloriesData[0]?.total || 0;

    res.json({
      steps: currentSteps,
      stepsTarget: targetSteps,
      workouts,
      calories: totalCalories
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
