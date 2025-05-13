import { NextFunction, Request, Response } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { CustomError } from "../utils/custom-error.js";

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const [monarch] = await db
      .select()
      .from(monarchsTable)
      .where(eq(monarchsTable.id, +req.params.id));

    if (!monarch) {
      return next(new CustomError("Monarch not found", 404));
    }

    res.status(200).json(monarch);
  } catch (error) {
    return next(new CustomError("Failed to fetch monarch", 500));
  }
}
