import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { CustomError } from "../utils/custom-error.js";

const objectIdSchema = z
  .string()
  .regex(/^[0-9]+$/, "ID must be a numeric value")
  .transform(Number);

export const validateIdParam =
  (paramName: string) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedId = objectIdSchema.parse(req.params[paramName]);
      res.locals[paramName] = parsedId;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(
          new CustomError(`Invalid ${paramName}: ${error.errors[0].message}`, 400)
        );
      }
      next(error);
    }
  };
