import express from "express";
import { prisma } from "./db/prisma.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import ticketRoutes from "./routes/ticket.routes.js";

export const app = express();



app.use(express.json());
app.use((req, _res, next) => {
  console.log("INCOMING", req.method, req.path, "ct:", req.headers["content-type"], "body:", req.body);
  next();
});


app.get(
  "/health",
  asyncHandler(async (_req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: "up" });
  })
);

app.use("/tickets", ticketRoutes);

app.use(notFound);
app.use(errorHandler);


export default app;