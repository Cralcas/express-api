import { Request, Response } from "express";
import { historicalFiguresData } from "../data/data";
import { IHistoricalFigure } from "../models/IHistoricalFigure";

const allowedFields = ["country", "continent", "birthYear", "deathYear"] as const;

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

  const filteredData = historicalFiguresData.filter((figure: IHistoricalFigure) => {
    const value = figure[field as keyof IHistoricalFigure];

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
