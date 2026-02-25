import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";
import asyncHandler from "express-async-handler";

const createSession = asyncHandler(async (req: Request, res: Response) => {
  const { templateId } = req.body;
  const userId = req.user.id;

  if (!templateId) {
    res.status(400);
    throw new Error("Template ID is missing");
  }

  const session = await prisma.session.create({ data: { templateId, userId } });

  res
    .status(200)
    .json({ id: session.id, templateId, userId, createdAt: session.createdAt });
});

export { createSession };
