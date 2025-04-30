import { Request, Response } from "express";
import { historicalFiguresData } from "../data/data";
import { IHistoricalFigure } from "../models/IHistoricalFigure";

export const updateHistoricalFigure = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = historicalFiguresData.findIndex((fig) => fig.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Historical figure not found" });
    return;
  }

  const updatedFigure: IHistoricalFigure = {
    ...historicalFiguresData[index],
    ...req.body,
    id,
  };

  historicalFiguresData[index] = updatedFigure;

  res.status(200).json(updatedFigure);
};
