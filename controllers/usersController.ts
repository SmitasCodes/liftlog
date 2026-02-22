import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.ts";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  console.log(user);

  const users = await prisma.user.findMany();
  console.log(users);
  res.status(201).json(users);
});

export { createUser };
