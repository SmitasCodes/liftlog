import asyncHandler from "express-async-handler";
import type { Request, Response, NextFunction } from "express";
import { getUser } from "./helpers/user.ts";

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, response } = await getUser(req);
    if (status === 200 && typeof response !== "string") {
      req.user = response;
      next();
    } else {
      if (typeof response === "string") {
        res.status(status).send(response);
      }
    }
  },
);

export { protect };
