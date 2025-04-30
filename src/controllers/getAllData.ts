import { Request, Response } from "express";
import { IQueryParams } from "../models/IQueryParams";
import { filterHistoricalFigures } from "../utils/filterHistoricalFigures";
import { historicalFiguresData } from "../data/data";

export const getAllFiltered = (req: Request, res: Response) => {
  const queryParams: IQueryParams = req.query;
  const filteredData = filterHistoricalFigures(historicalFiguresData, queryParams);
  res.json(filteredData);
};
