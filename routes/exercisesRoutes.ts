import { Router } from "express";
import { protect } from "../middleware/authMiddleware.ts";
import { createExercise } from "../controllers/exercisesController.ts";

const router = Router();
router.post("/", protect, createExercise);

export default router;
