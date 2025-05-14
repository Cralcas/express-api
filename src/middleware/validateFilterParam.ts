import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { CustomError } from "../utils/custom-error.js";

const allowedFields = [
  "house",
  "regnal",
  "birthYear",
  "deathYear",
  "birthPlace",
  "religion",
  "burialPlace",
] as const;

const filterParamsSchema = z.object({
  field: z.enum(allowedFields),
  term: z.string().min(1, "Search term cannot be empty").trim(),
});

export const validateFilterParams = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = filterParamsSchema.safeParse(req.params);
    if (!result.success) {
      console.error("Zod validation error (filter params):", result.error.flatten());
      return next(new CustomError("Invalid filter parameters", 400));
    }
    req.params = result.data;
    next();
  } catch (error) {
    next(error);
  }
};
