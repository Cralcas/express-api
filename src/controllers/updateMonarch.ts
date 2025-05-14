import { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { CustomError } from "../utils/custom-error.js";
import { eq } from "drizzle-orm";

export const updateMonarch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validData = req.body;

    const [monarch] = await db
      .update(monarchsTable)
      .set(validData)
      .where(eq(monarchsTable.id, res.locals.id))
      .returning();

    if (!monarch) {
      return next(new CustomError("Error updating monarch", 500));
    }

    res.status(200).json(monarch);
  } catch (error) {
    return next(new CustomError("Failed to update monarch", 500));
  }
};
