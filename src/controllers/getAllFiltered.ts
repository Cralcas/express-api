import { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { and, eq, ilike, or } from "drizzle-orm";
import { kebabCaseToSpace } from "../utils/kebabCaseToSpace.js";
import { CustomError } from "../utils/custom-error.js";

export const getAllFiltered = async (req: Request, res: Response, next: NextFunction) => {
  const {
    s,
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
  } = res.locals.query;

  const filters = [];

  if (s) {
    const term = `%${s}%`;
    const numericSearch = Number(s);
    const isNumeric = !isNaN(numericSearch);

    const genericSearchConditions = or(
      ilike(monarchsTable.firstName, term),
      ilike(monarchsTable.regnalName, term),
      ilike(monarchsTable.birthName, term),
      ilike(monarchsTable.house, term),
      ilike(monarchsTable.religion, term),
      ilike(monarchsTable.birthPlace, term),
      ilike(monarchsTable.burialPlace, term)
    );

    if (isNumeric) {
      filters.push(
        or(
          genericSearchConditions,
          eq(monarchsTable.birthYear, numericSearch),
          eq(monarchsTable.deathYear, numericSearch)
        )
      );
    } else {
      filters.push(genericSearchConditions);
    }
  }

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
    filters.push(ilike(monarchsTable.regnalName, `%${kebabCaseToSpace(regnalName)}%`));
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
  if (filters.length === 0) {
    const result = await db.select().from(monarchsTable);
    res.status(200).json(result);
    return;
  }

  try {
    const result = await db
      .select()
      .from(monarchsTable)
      .where(and(...filters));

    res.status(200).json(result);
    return;
  } catch (error) {
    return next(new CustomError("Error fetching monarchs from DB", 500));
  }
};
