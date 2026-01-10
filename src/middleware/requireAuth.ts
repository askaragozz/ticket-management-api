import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma.js";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header("x-user-id");
  if (!userId) {
    return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Missing authentication" } });
  }

  // dev stub: ensure FK passes
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId, email: `${userId}@dev.local`, role: "USER" },
  });

  req.user = { id: userId, role: "USER" };
  next();
};
