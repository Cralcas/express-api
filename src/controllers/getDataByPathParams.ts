import { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { kebabCaseToSpace } from "../utils/kebabCaseToSpace.js";
import { CustomError } from "../utils/custom-error.js";

const allowedFields = ["house", "regnal", "birthYear", "deathYear", "birthPlace", "religion", "burialPlace"] as const;

type AllowedField = (typeof allowedFields)[number];

// Define which fields are numeric
const numericFields = new Set<AllowedField>(["birthYear", "deathYear"]);

export const getDataByPathParams = async (
  req: Request<{ field: string; term: string }>,
  res: Response,
  next: NextFunction
) => {
  const { field, term } = req.params;

  // Validate the field
  if (!allowedFields.includes(field as AllowedField)) {
    return next(new CustomError(`Search field not allowed. Use only: ${allowedFields.join(", ")}`, 400));
  }

  const formattedTerm = kebabCaseToSpace(term);
  const fieldKey = field as AllowedField;

  const value = numericFields.has(fieldKey) ? Number(formattedTerm) : formattedTerm;

  try {
    const column = monarchsTable[fieldKey];

    const results = await db.select().from(monarchsTable).where(eq(column, value));

    if (results.length === 0) {
      return next(new CustomError("No monarchs found with given filter", 404));
    }

    res.json(results);
    return;
  } catch {
    return next(new CustomError("Database query failed", 500));
  }
};
