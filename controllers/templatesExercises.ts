import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../lib/prisma.ts";

const createTemplateExercise = asyncHandler(
  async (req: Request, res: Response) => {
    const { exerciseId, templateId, sets, order } = req.body;

    if (!exerciseId || !templateId || !sets || !order) {
      res.status(400);
      throw new Error("Missing template exercise fields");
    }

    const templateExercise = await prisma.templateExercise.create({
      data: {
        sets,
        order,
        exerciseId,
        templateId,
      },
    });

    res.status(201).json({
      id: templateExercise.id,
      sets,
      order,
      exerciseId,
      templateId,
    });
  },
);

export { createTemplateExercise };
