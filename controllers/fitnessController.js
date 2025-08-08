import Fitness from '../models/Fitness.js';
import mongoose from 'mongoose';

// Create (Add Exercise)
export const logExercise = async (req, res) => {
  try {
    const newExercise = new Fitness({ ...req.body, user: req.userId });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read (Get All Exercises for Logged-in User)
export const getExercises = async (req, res) => {
  try {
    const exercises = await Fitness.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Exercise
export const updateExercise = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedExercise = await Fitness.findOneAndUpdate(
      { _id: id, user: req.userId },
      { ...req.body },
      { new: true }
    );
    if (!updatedExercise) return res.status(404).json({ message: 'Exercise not found' });
    res.status(200).json(updatedExercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Exercise
export const deleteExercise = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExercise = await Fitness.findOneAndDelete({ _id: id, user: req.userId });
    if (!deletedExercise) return res.status(404).json({ message: 'Exercise not found' });
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
