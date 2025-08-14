// routes/fitness.js
import express from "express";
import { addWorkout, getWorkouts, updateWorkout, deleteWorkout } from "../controllers/fitnessController.js";

const router = express.Router();

router.post("/", addWorkout);
router.get("/", getWorkouts);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;
