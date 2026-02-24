import type { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

export {};
