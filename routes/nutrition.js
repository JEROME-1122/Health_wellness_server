import express from 'express';
import { logNutrition, getNutritions, updateNutrition, deleteNutrition } from '../controllers/nutritionController.js';

const router = express.Router();

router.post('/', logNutrition);
router.get('/', getNutritions);
router.put('/:id', updateNutrition);
router.delete('/:id', deleteNutrition);

export default router;
