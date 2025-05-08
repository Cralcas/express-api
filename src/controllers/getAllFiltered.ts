import { Request, Response } from "express";
import { db } from "../db";
import { monarchs } from "../db/schema";
import { and, eq, ilike } from "drizzle-orm";
import { IQueryParams } from "../models/IQueryParams";
import { kebabCaseToSpace } from "../utils/kebabCaseToSpace";

export const getAllFiltered = async (req: Request, res: Response) => {
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
    filters.push(ilike(monarchs.firstName, `%${firstName}%`));
  }

  if (regnal) {
    filters.push(eq(monarchs.regnal, regnal));
  }

  if (birthName) {
    filters.push(ilike(monarchs.birthName, `%${kebabCaseToSpace(birthName)}%`));
  }

  if (regnalName) {
    filters.push(ilike(monarchs.regnalName, `%${kebabCaseToSpace(regnalName)}%`));
  }

  if (house) {
    filters.push(ilike(monarchs.house, `%${house}%`));
  }

  if (birthYear) {
    filters.push(eq(monarchs.birthYear, Number(birthYear)));
  }

  if (deathYear) {
    filters.push(eq(monarchs.deathYear, Number(deathYear)));
  }

  if (birthPlace) {
    filters.push(ilike(monarchs.birthPlace, `%${birthPlace}%`));
  }

  if (religion) {
    filters.push(ilike(monarchs.religion, `%${religion}%`));
  }

  if (burialPlace) {
    filters.push(ilike(monarchs.burialPlace, `%${burialPlace}%`));
  }

  try {
    const result = await db
      .select()
      .from(monarchs)
      .where(filters.length > 0 ? and(...filters) : undefined);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching monarchs from DB" });
  }
};
