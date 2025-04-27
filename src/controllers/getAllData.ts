import { Request, Response } from "express";
import { IQueryParams } from "../models/IQueryParams";
import { filterStartups } from "../utils/filterStartups";
import { startups } from "../data/data";

export const getAllFiltered = (req: Request, res: Response) => {
  const queryParams: IQueryParams = req.query;
  const filteredData = filterStartups(startups, queryParams);
  res.json(filteredData);
};
