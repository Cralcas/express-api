import { Request, Response } from "express";
import { IHistoricalFigure } from "../models/IHistoricalFigure";
import { historicalFiguresData } from "../data/data";

export const createHistoricalFigure = (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    regnalNumber,
    birthYear,
    deathYear,
    continent,
    country,
    imageUrl,
    bio,
  } = req.body;

  if (
    !firstName ||
    birthYear == null ||
    deathYear == null ||
    !continent ||
    !country ||
    !bio
  ) {
    res.status(400).json({ message: "Missing required fields." });
    return;
  }

  const newFigure: IHistoricalFigure = {
    id: "7",
    firstName,
    lastName: lastName ?? null,
    regnalNumber: regnalNumber ?? null,
    nameDisplay: `${firstName}${regnalNumber ? " " + regnalNumber : ""}${
      lastName ? " " + lastName : ""
    }`.trim(),
    birthYear: Number(birthYear),
    deathYear: Number(deathYear),
    continent,
    country,
    imageUrl: imageUrl ?? "/images/image-placeholder.jpeg",
    bio,
  };

  historicalFiguresData.push(newFigure);

  res.status(201).json(newFigure);
  return;
};
