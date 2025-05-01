import { Request, Response } from "express";
import { monarchsData } from "../data/data";
import { IMonarch } from "../models/IMonarch";

const allowedFields = [
  "country",
  "continent",
  "birthYear",
  "deathYear",
  "birthPlace",
  "religion",
  "burialPlace",
] as const;

type AllowedField = (typeof allowedFields)[number];

export const getDataByPathParams = (
  req: Request<{ field: string; term: string }>,
  res: Response
) => {
  const { field, term } = req.params;

  const formattedTerm = term.replace(/-/g, " ");

  if (!allowedFields.includes(field as AllowedField)) {
    res.status(400).json({
      message: `Search field not allowed. Please use only: ${allowedFields.join(
        ", "
      )}`,
    });
    return;
  }

  const filteredData = monarchsData.filter((monarch: IMonarch) => {
    const value = monarch[field as keyof IMonarch];

    if (typeof value === "string") {
      return value.toLowerCase() === formattedTerm.toLowerCase();
    }

    if (typeof value === "number") {
      return value === Number(term);
    }

    return false;
  });

  res.json(filteredData);
};
