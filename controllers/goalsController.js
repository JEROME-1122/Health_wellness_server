import Goal from '../models/Goal.js';

// Add New Goal
export const addGoal = async (req, res) => {
  try {
    const { title, totalSteps, stepsCompleted } = req.body;

    // Calculate progress safely
    const progress = totalSteps > 0 ? (stepsCompleted / totalSteps) * 100 : 0;

    const newGoal = new Goal({
      title,
      totalSteps,
      stepsCompleted,
      progress,
      user: req.userId
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Goals for Logged-in User
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Goal
export const updateGoal = async (req, res) => {
  try {
    const { title, totalSteps, stepsCompleted } = req.body;

    const progress = totalSteps > 0 ? (stepsCompleted / totalSteps) * 100 : 0;

    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, totalSteps, stepsCompleted, progress },
      { new: true }
    );

    if (!updatedGoal) return res.status(404).json({ message: 'Goal not found' });

    res.json(updatedGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Goal
export const deleteGoal = async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: 'Goal Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
