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

export { createTemplate };
