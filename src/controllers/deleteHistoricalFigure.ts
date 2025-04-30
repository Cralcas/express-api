import { Request, Response } from "express";
import { historicalFiguresData } from "../data/data";
import { IHistoricalFigure } from "../models/IHistoricalFigure";

export const deleteHistoricalFigure = (req: Request, res: Response) => {
  const { id } = req.params;

  const index = historicalFiguresData.findIndex(
    (person: IHistoricalFigure) => person.id === id
  );

  if (index === -1) {
    res.status(404).json({ message: "Historical figure not found" });
    return;
  }

  // Remove from array
  const deletedFigure = historicalFiguresData.splice(index, 1)[0];

  res.status(200).json({
    message: "Historical figure deleted",
    deleted: deletedFigure,
  });
};
