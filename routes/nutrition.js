import express from "express";
import {
  addFood,
  getFoods,
  updateFood,
  deleteFood,
} from "../controllers/nutritionController.js";

const router = express.Router();

router.post("/", addFood);

 
router.get("/", getFoods);

 
router.put("/:id", updateFood);

 
router.delete("/:id", deleteFood);

export default router;
