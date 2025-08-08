import express from 'express';
import { addGoal, getGoals, updateGoal, deleteGoal } from '../controllers/goalsController.js';

const router = express.Router();

router.post('/', addGoal);           // Add Goal
router.get('/', getGoals);            // Get All Goals
router.put('/:id', updateGoal);       // Update Goal
router.delete('/:id', deleteGoal);    // Delete Goal

export default router;
