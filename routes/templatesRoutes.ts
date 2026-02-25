import { Router } from "express";
import {
  createTemplate,
  getTemplate,
  getTemplates,
} from "../controllers/templatesController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = Router();
router.post("/", protect, createTemplate).get("/", protect, getTemplates);
router.get("/:id", protect, getTemplate);

export default router;
