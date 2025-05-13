import { Request, Response, NextFunction } from "express";
import { monarchsTable } from "../db/schema.js";
import { db } from "../db/index.js";
import { CustomError } from "../utils/custom-error.js";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const monarchs = await db.select().from(monarchsTable);

    res.status(200).json(monarchs);
  } catch (error) {
    return next(new CustomError("Failed to fetch monarchs", 500));
  }
}
