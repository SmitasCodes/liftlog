import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.ts";
import type { Request, Response } from "express";

//======================== CREATE USER ========================//
// @desc Register new user
// @route POST /api/users/
// @access PUBLIC

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const userExist = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (userExist) {
    res.status(400);
    if (userExist.username === username) {
      throw new Error("Username already exists");
    }
    throw new Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    id: user.id,
    username,
    email,
    token: generateToken(user.id),
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  });
});

//======================== LOGIN USER ========================//
// @desc Register new user
// @route POST /api/users/login
// @access PUBLIC

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    id: user.id,
    username,
    email: user.email,
    token: generateToken(user.id),
  });
});

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { createUser, loginUser };
