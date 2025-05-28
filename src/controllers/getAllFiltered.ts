import { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { and, count, eq, ilike, or } from "drizzle-orm";
import { kebabCaseToSpace } from "../utils/kebabCaseToSpace.js";
import { CustomError } from "../utils/custom-error.js";
import { MonarchQueryParams } from "../schemas/monarchQuerySchema.js";

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
    page = 1,
    pageSize = 10,
  } = res.locals.query as MonarchQueryParams;

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

  try {
    const countQuery = db.select({ count: count() }).from(monarchsTable);
    if (filters.length > 0) {
      countQuery.where(and(...filters));
    }
    const totalCountResult = await countQuery;
    const totalItems = totalCountResult[0].count;

    let dataQuery = db.select().from(monarchsTable).$dynamic();

    if (filters.length > 0) {
      dataQuery = dataQuery.where(and(...filters));
    }

    const offset = (page - 1) * pageSize;
    dataQuery = dataQuery.limit(pageSize).offset(offset);

    const monarchs = await dataQuery;

    res.status(200).json({
      data: monarchs,
      total: totalItems,
      page: page,
      pageSize: pageSize,
      pageCount: Math.ceil(totalItems / pageSize),
    });
  } catch (error) {
    console.error("Error fetching monarchs with pagination:", error);
    return next(new CustomError("Error fetching monarchs from DB", 500));
  }
};
