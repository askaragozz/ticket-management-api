import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

export const validateBody =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request body",
          issues: parsed.error.issues,
        },
      });
    }

    req.body = parsed.data;
    next();
  };
