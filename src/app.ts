import express from "express";
import { prisma } from "./db/prisma.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();

app.get(
  "/health",
  asyncHandler(async (_req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: "up" });
  })
);

app.use(notFound);
app.use(errorHandler);
