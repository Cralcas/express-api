import { NextFunction, Request, Response } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { CustomError } from "../utils/custom-error.js";

export const createMonarch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validData = req.body;

    const [monarch] = await db.insert(monarchsTable).values(validData).returning();

    if (!monarch) {
      return next(new CustomError("Error creating monarch", 500));
    }

    res.status(201).json(monarch);
  } catch (error) {
    return next(new CustomError("Failed to create monarch", 500));
  }
};
