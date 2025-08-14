import Fitness from "../models/Fitness.js";
import Nutrition from "../models/Nutrition.js";
import Goal from "../models/Goal.js";

export const getCaloriesSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Total calories intake from Nutrition
    const nutritionData = await Nutrition.find({ user: userId });
    const caloriesIntake = nutritionData.reduce((sum, item) => sum + (item.calories || 0), 0);

    // 2. Total calories burned from Fitness
    const fitnessData = await Fitness.find({ user: userId });
    const caloriesBurned = fitnessData.reduce((sum, item) => sum + (item.caloriesBurned || 0), 0);

    // 3. Calorie target from Goals (optional)
    const goalData = await Goal.findOne({ user: userId, title: /calorie/i }); 
    const calorieTarget = goalData ? goalData.totalSteps : null; // or a dedicated field if you have it

    // 4. Net calories
    const netCalories = caloriesIntake - caloriesBurned;

    // Response
    res.json({
      caloriesIntake,
      caloriesBurned,
      netCalories,
      calorieTarget
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
