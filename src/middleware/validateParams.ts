import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

export const validateParams =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.params);

    if (!parsed.success) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid route params",
          issues: parsed.error.issues,
        },
      });
    }

    res.locals.params = parsed.data;
    next();
  };
