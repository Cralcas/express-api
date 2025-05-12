import { NextFunction, Request, Response } from "express";
import { db } from "../db/index.js";
import { monarchsTable } from "../db/schema.js";
import { CustomError } from "../utils/custom-error.js";

export const createMonarch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const {
  //   birthName,
  //   regnalName,
  //   firstName,
  //   regnal,
  //   house,
  //   birthYear,
  //   deathYear,
  //   reignStart,
  //   reignEnd,
  //   birthPlace,
  //   religion,
  //   burialPlace,
  //   imageUrl,
  //   bio,
  // } = req.body;
  // if (
  //   !birthName ||
  //   !regnalName ||
  //   !house ||
  //   !firstName ||
  //   !regnal ||
  //   birthYear == null ||
  //   deathYear == null ||
  //   reignStart == null ||
  //   reignEnd == null ||
  //   !birthPlace ||
  //   !religion ||
  //   !burialPlace ||
  //   !bio
  // ) {
  //   res.status(400).json({ message: "Missing required fields." });
  //   return;
  // }
  // const newMonarch: IMonarch = {
  //   id: String(monarchsData.length + 1),
  //   birthName,
  //   regnalName,
  //   firstName,
  //   regnal,
  //   house,
  //   birthYear: Number(birthYear),
  //   deathYear: Number(deathYear),
  //   reignStart: Number(reignStart),
  //   reignEnd: Number(reignEnd),
  //   birthPlace,
  //   religion,
  //   burialPlace,
  //   imageUrl: imageUrl || "/images/monarch-placeholder.jpeg",
  //   bio,
  // };
  // monarchsData.push(newMonarch);
  // res.status(201).json(newMonarch);
  // return;

  try {
    const [monarch] = await db.insert(monarchsTable).values(req.body).returning();

    if (!monarch) {
      return next(new CustomError("Error creating monarch", 404));
    }

    res.status(201).json(monarch);
  } catch (error) {
    next(new CustomError("Failed to create monarch", 500));
  }
};
