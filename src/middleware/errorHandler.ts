import type { ErrorRequestHandler } from "express";
import { HttpError } from "../utils/httpError.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err instanceof HttpError ? err.status : 500;
  const message = err instanceof HttpError ? err.message : "Internal server error";

  if (status === 500) console.error(err);

  res.status(status).json({ message });
};
