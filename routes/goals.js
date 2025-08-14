// routes/goals.js
import express from "express";
import {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";

const router = express.Router();

router.post("/", addGoal);
router.get("/", getGoals);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;
