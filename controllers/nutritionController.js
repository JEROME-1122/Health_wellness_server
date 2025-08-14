import Nutrition from "../models/Nutrition.js";

// Add food log
export const addFood = async (req, res) => {
  try {
    const { foodName, quantity, calories, protein, carbs, fat } = req.body;

    const food = new Nutrition({
      user: req.user.id,
      foodName,
      quantity,
      calories,
      protein,
      carbs,
      fat,
    });

    await food.save();
    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all food logs for logged-in user
export const getFoods = async (req, res) => {
  try {
    const foods = await Nutrition.find({ user: req.user.id }).sort({ date: -1 });
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a food log
export const updateFood = async (req, res) => {
  try {
    const { foodName, quantity, calories, protein, carbs, fat } = req.body;

    const food = await Nutrition.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food log not found" });

    if (food.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    food.foodName = foodName || food.foodName;
    food.quantity = quantity || food.quantity;
    food.calories = calories || food.calories;
    food.protein = protein || food.protein;
    food.carbs = carbs || food.carbs;
    food.fat = fat || food.fat;

    await food.save();
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a food log
export const deleteFood = async (req, res) => {
  try {
    const food = await Nutrition.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food log not found" });

    if (food.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await food.deleteOne();
    res.json({ message: "Food log deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
