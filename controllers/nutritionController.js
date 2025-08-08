import Nutrition from '../models/Nutrition.js';

// Add Nutrition
export const logNutrition = async (req, res) => {
  try {
    const newNutrition = new Nutrition({ ...req.body, user: req.userId });
    await newNutrition.save();
    res.status(201).json(newNutrition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Nutritions for Logged In User
export const getNutritions = async (req, res) => {
  try {
    const nutritions = await Nutrition.find({ user: req.userId });
    res.status(200).json(nutritions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Nutrition
export const updateNutrition = async (req, res) => {
  try {
    const updatedNutrition = await Nutrition.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedNutrition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Nutrition
export const deleteNutrition = async (req, res) => {
  try {
    await Nutrition.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Nutrition deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
