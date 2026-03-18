import { Router } from "express";
import { protect } from "../middleware/authMiddleware.ts";
import { createTemplateExercise } from "../controllers/templatesExercises.ts";

const router = Router();

router.post("/:templateId/exercises/:exerciseId", protect, createTemplateExercise);

export default router;
