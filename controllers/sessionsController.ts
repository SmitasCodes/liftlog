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
    .status(201)
    .json({ id: session.id, templateId, userId, createdAt: session.createdAt });
});

const getSessions = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;

  if (!userId) {
    res.status(400);
    throw new Error("User id is missing");
  }

  const sessions = await prisma.session.findMany({
    where: { userId },
    omit: { userId: true },
    include: {
      template: { select: { id: true, name: true } },
      sets: {
        select: {
          id: true,
          reps: true,
          setNumber: true,
          weight: true,
          exercise: { select: { id: true, name: true } },
        },
      },
    },
  });

  res.status(200).json({
    sessions,
  });
});

const getSession = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user.id;

  if (!id || !userId) {
    res.status(400);
    throw new Error("Missing fields for session");
  }

  const session = await prisma.session.findUnique({
    where: { id, userId },
    include: {
      template: { select: { id: true, name: true } },
      sets: {
        select: {
          id: true,
          reps: true,
          setNumber: true,
          weight: true,
          exercise: { select: { id: true, name: true } },
        },
      },
    },
  });

  res.status(200).json({ session });
});

export { createSession, getSessions, getSession };
