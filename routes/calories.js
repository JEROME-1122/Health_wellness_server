import express from "express";
import { getCaloriesSummary } from "../controllers/caloriesController.js";

const router = express.Router();

router.get("/", getCaloriesSummary);

export default router;
