import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";
import asyncHandler from "express-async-handler";

const createExercise = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name) {
    res.status(400);
    throw new Error("Missing exercise name");
  }

  const exercise = await prisma.exercise.create({ data: { name, userId } });

  res.status(201).json({
    id: exercise.id,
    name,
    userId,
  });
});

export { createExercise };
