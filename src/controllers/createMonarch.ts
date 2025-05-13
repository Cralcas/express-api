import { NextFunction, Request, Response } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { CustomError } from "../utils/custom-error.js";
import { insertMonarchSchema } from "../schemas/monarchs.schema.js";

export const createMonarch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = insertMonarchSchema.safeParse(req.body);

    if (!result.success) {
      console.error("Zod validation errors:", result.error.flatten());
      return next(new CustomError("Validation failed", 400));
    }
    const validData = result.data;

    const [monarch] = await db.insert(monarchsTable).values(validData).returning();

    if (!monarch) {
      return next(new CustomError("Error creating monarch", 500));
    }

    res.status(201).json(monarch);
  } catch (error) {
    return next(new CustomError("Failed to create monarch", 500));
  }
};
