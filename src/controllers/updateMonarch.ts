import { Request, Response } from "express";
import { monarchsData } from "../data/data";
import { IMonarch } from "../models/IMonarch";

export const updateMonarch = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = monarchsData.findIndex((monarch) => monarch.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Monarch not found" });
    return;
  }

  const updatedMonarch: IMonarch = {
    ...monarchsData[index],
    ...req.body,
    id,
  };

  monarchsData[index] = updatedMonarch;

  res.status(200).json(updatedMonarch);
};
