import { Router } from "express";
import { protect } from "../middleware/authMiddleware.ts";
import {
  createSession,
  getSessions,
  getSession
} from "../controllers/sessionsController.ts";
import { createSet } from "../controllers/setsController.ts";

const router = Router();

router.post("/", protect, createSession).get("/", protect, getSessions);
router.get("/:id", protect, getSession);
router.post("/:id/sets/", protect, createSet);

export default router;
