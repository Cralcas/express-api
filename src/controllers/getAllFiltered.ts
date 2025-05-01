import { Request, Response } from "express";
import { IQueryParams } from "../models/IQueryParams";
import { monarchsData } from "../data/data";
import { filterMonarchs } from "../utils/filterMonarchs";

export const getAllFiltered = (req: Request, res: Response) => {
  const queryParams: IQueryParams = req.query;
  const filteredData = filterMonarchs(monarchsData, queryParams);
  res.json(filteredData);
};
