import { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { monarchsTable } from "../db/schema.js";
import { CustomError } from "../utils/custom-error.js";

export const deleteMonarch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [monarch] = await db.delete(monarchsTable).where(eq(monarchsTable.id, res.locals.id)).returning({
      deletedMonarch: monarchsTable.id,
    });

    if (!monarch) {
      return next(new CustomError("Monarch not found", 404));
    }

    res.status(200).json({
      message: "Monarch deleted successfully",
      id: monarch.deletedMonarch,
    });
    return;
  } catch (error) {
    return next(new CustomError("Failed to delete monarch", 500));
  }
};
