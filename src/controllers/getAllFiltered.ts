import { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { and, eq, ilike } from "drizzle-orm";
import { IQueryParams } from "../models/IQueryParams.js";
import { kebabCaseToSpace } from "../utils/kebabCaseToSpace.js";
import { CustomError } from "../utils/custom-error.js";

export const getAllFiltered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    regnalName,
    birthName,
    firstName,
    regnal,
    house,
    birthYear,
    deathYear,
    birthPlace,
    religion,
    burialPlace,
  }: IQueryParams = req.query;

  const filters = [];

  if (firstName) {
    filters.push(ilike(monarchsTable.firstName, `%${firstName}%`));
  }

  if (regnal) {
    filters.push(eq(monarchsTable.regnal, regnal));
  }

  if (birthName) {
    filters.push(ilike(monarchsTable.birthName, `%${kebabCaseToSpace(birthName)}%`));
  }

  if (regnalName) {
    filters.push(
      ilike(monarchsTable.regnalName, `%${kebabCaseToSpace(regnalName)}%`)
    );
  }

  if (house) {
    filters.push(ilike(monarchsTable.house, `%${house}%`));
  }

  if (birthYear) {
    filters.push(eq(monarchsTable.birthYear, Number(birthYear)));
  }

  if (deathYear) {
    filters.push(eq(monarchsTable.deathYear, Number(deathYear)));
  }

  if (birthPlace) {
    filters.push(ilike(monarchsTable.birthPlace, `%${birthPlace}%`));
  }

  if (religion) {
    filters.push(ilike(monarchsTable.religion, `%${religion}%`));
  }

  if (burialPlace) {
    filters.push(ilike(monarchsTable.burialPlace, `%${burialPlace}%`));
  }

  try {
    const result = await db
      .select()
      .from(monarchsTable)
      .where(filters.length > 0 ? and(...filters) : undefined);

    res.status(200).json(result);
  } catch (error) {
    next(new CustomError("Error fetching monarchs from DB", 500));
  }
};
