import { Request, Response, NextFunction } from "express";
import { monarchQuerySchema } from "../schemas/monarchQuerySchema.js";
import { CustomError } from "../utils/custom-error.js";
import { ParsedQs } from "qs";

export const validateSearch = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = monarchQuerySchema.safeParse(req.query);
    if (!result.success) {
      console.error("Zod validation error (search query):", result.error.flatten());
      return next(new CustomError("Invalid search query parameters", 400));
    }

    res.locals.query = result.data;
    next();
  } catch (error) {
    next(error);
  }
};
