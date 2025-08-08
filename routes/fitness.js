import express from 'express';
import { logExercise, getExercises, updateExercise, deleteExercise } from '../controllers/fitnessController.js';

const router = express.Router();

router.post('/', logExercise);        // Add Exercise
router.get('/', getExercises);         // Get All Exercises
router.put('/:id', updateExercise);    // Update Exercise
router.delete('/:id', deleteExercise); // Delete Exercise

export default router;
