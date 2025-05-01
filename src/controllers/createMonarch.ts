import { Request, Response } from "express";
import { IMonarch } from "../models/IMonarch";
import { monarchsData } from "../data/data";

export const createMonarch = (req: Request, res: Response) => {
  const {
    birthName,
    regnalName,
    house,
    birthYear,
    deathYear,
    reignStart,
    reignEnd,
    birthPlace,
    religion,
    burialPlace,
    imageUrl,
    bio,
  } = req.body;

  if (
    !birthName ||
    !regnalName ||
    !house ||
    birthYear == null ||
    deathYear == null ||
    reignStart == null ||
    reignEnd == null ||
    !birthPlace ||
    !religion ||
    !burialPlace ||
    !bio
  ) {
    res.status(400).json({ message: "Missing required fields." });
    return;
  }

  const newMonarch: IMonarch = {
    id: String(monarchsData.length + 1),
    birthName,
    regnalName,
    house,
    birthYear: Number(birthYear),
    deathYear: Number(deathYear),
    reignStart: Number(reignStart),
    reignEnd: Number(reignEnd),
    birthPlace,
    religion,
    burialPlace,
    imageUrl: imageUrl || "/images/monarch-placeholder.jpeg",
    bio,
  };

  monarchsData.push(newMonarch);

  res.status(201).json(newMonarch);
  return;
};
