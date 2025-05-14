import { Request, Response, NextFunction } from "express";
import {
  insertMonarchSchema,
  updateMonarchSchema,
} from "../schemas/monarchs.schema.js";
import { CustomError } from "../utils/custom-error.js";

export const validateCreateMonarch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = insertMonarchSchema.safeParse(req.body);
    if (!result.success) {
      console.error(
        "Zod validation errors (createMonarch):",
        result.error.flatten()
      );
      return next(new CustomError("Validation failed for creating monarch", 400));
    }
    req.body = result.data;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUpdateMonarch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = updateMonarchSchema.safeParse(req.body);
    if (!result.success) {
      console.error(
        "Zod validation errors (updateMonarch):",
        result.error.flatten()
      );
      return next(new CustomError("Validation failed for updating monarch", 400));
    }
    req.body = result.data;
    next();
  } catch (error) {
    next(error);
  }
};
