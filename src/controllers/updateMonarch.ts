import { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { CustomError } from "../utils/custom-error.js";
import { eq } from "drizzle-orm";
import { updateMonarchSchema } from "../schemas/monarchs.schema.js";

export const updateMonarch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = updateMonarchSchema.safeParse(req.body);

    if (!result.success) {
      console.error("Zod validation errors:", result.error.flatten());
      return next(new CustomError("Validation failed", 400));
    }
    const validData = result.data;

    const [monarch] = await db
      .update(monarchsTable)
      .set(validData)
      .where(eq(monarchsTable.id, +req.params.id))
      .returning();

    if (!monarch) {
      return next(new CustomError("Error creating monarch", 500));
    }

    res.status(201).json(monarch);
  } catch (error) {
    return next(new CustomError("Failed to update note", 500));
  }
};
