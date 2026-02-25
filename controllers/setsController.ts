import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../lib/prisma.ts";

const createSet = asyncHandler(async (req: Request, res: Response) => {
  const { reps, setNumber, weight, exerciseId } = req.body;
  const sessionId = Number(req.params.sessionId);

  if (!reps || !setNumber || !weight || !exerciseId || !sessionId) {
    res.status(400);
    throw new Error("Missing fields for sets");
  }

  const set = await prisma.set.create({
    data: { reps, setNumber, weight, exerciseId, sessionId },
  });

  res
    .status(201)
    .json({ id: set.id, reps, setNumber, weight, exerciseId, sessionId });
});

export { createSet };
