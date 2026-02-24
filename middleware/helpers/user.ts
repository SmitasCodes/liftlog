import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.ts";
import type { Request } from "express";
const NOT_AUTHORIZED = "Not authorized";
const NOT_AUTHORIZED_NO_TOKEN = "Not authorized, no token";

const getUser = async (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return { status: 401, response: NOT_AUTHORIZED_NO_TOKEN };
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: number;
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        omit: { password: true },
      });

      if (!user) {
        return { status: 404, response: "User not found" };
      }

      return { status: 200, response: user };
    } catch (error) {
      return { status: 401, response: NOT_AUTHORIZED };
    }
  }
  return { status: 401, response: NOT_AUTHORIZED };
};

export { getUser };
