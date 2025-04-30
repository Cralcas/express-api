import { Request, Response } from "express";
import { historicalFiguresData } from "../data/data";
import { IHistoricalFigure } from "../models/IHistoricalFigure";

export const getOne = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const figure = historicalFiguresData.find(
    (person: IHistoricalFigure) => person.id === id
  );

  if (!figure) {
    res.status(404).json({ message: "Historical figure not found" });
    return;
  }

  res.status(200).json(figure);
};
