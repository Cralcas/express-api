import { Request, Response } from "express";
import { startups } from "../data/data";

const allowedFields = [
  "industry",
  "country",
  "continent",
  "is_seeking_funding",
  "has_mvp",
] as const;
type AllowedField = (typeof allowedFields)[number];

export const getDataByPathParams = (
  req: Request<{ field: AllowedField; term: string }>,
  res: Response
) => {
  const { field, term } = req.params;

  if (!allowedFields.includes(field as AllowedField)) {
    res.status(400).json({
      message:
        "Search field not allowed. Please use only 'country', 'continent', 'industry', 'is_seeking_funding', 'has_mvp'",
    });

    return;
  }

  const filteredData = startups.filter((startup) => {
    const value = startup[field as keyof typeof startup];

    if (typeof value === "string") {
      return value.toLowerCase() === term.toLowerCase();
    }

    if (typeof value === "boolean") {
      return value === (term.toLowerCase() === "true");
    }

    return false;
  });

  res.json(filteredData);
};
