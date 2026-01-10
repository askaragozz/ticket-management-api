import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

export const validateQuery =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid query params",
          issues: parsed.error.issues,
        },
      });
    }

    res.locals.query = parsed.data;
    next();
  };
