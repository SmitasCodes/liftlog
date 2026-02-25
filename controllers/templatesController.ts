import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../lib/prisma.ts";

const createTemplate = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name) {
    res.status(400);
    throw new Error("Missing template name");
  }

  const template = await prisma.template.create({
    data: {
      name,
      userId,
    },
  });

  res.status(201).json({
    id: template.id,
    name,
    userId,
  });
});

const getTemplates = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const templates = await prisma.template.findMany({ where: { userId } });

  res.status(200).json({ templates });
});

const getTemplate = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(400);
    throw new Error("Missing template id param");
  }

  const template = await prisma.template.findUnique({
    where: { id },
    include: {
      templateExercises: {
        select: {
          id: true,
          order: true,
          sets: true,
          exercise: { select: { id: true, name: true } },
        },
      },
    },
  });

  res.status(200).json(template);
});

export { createTemplate, getTemplates, getTemplate };
