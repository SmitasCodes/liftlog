import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.ts";

// REGISTER USER
const createUser = asyncHandler(async (req, res) => {
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

// Generate JWT
const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { createUser };
