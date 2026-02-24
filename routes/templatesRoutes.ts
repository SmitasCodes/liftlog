import { Router } from "express";
import { createTemplate } from "../controllers/templatesController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = Router();
router.post("/", protect, createTemplate);

export default router;
