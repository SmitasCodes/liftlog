import { Router } from "express";
import { protect } from "../middleware/authMiddleware.ts";
import { createSession } from "../controllers/sessionsController.ts";
import { createSet } from "../controllers/setsController.ts";

const router = Router();

router.post("/", protect, createSession);
router.post("/:sessionId/sets/", protect, createSet);

export default router;
