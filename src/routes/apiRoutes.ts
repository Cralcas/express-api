import express from "express";
import { getAllFiltered } from "../controllers/getAllData";
import { getDataByPathParams } from "../controllers/getDataByPathParams";
import { getOne } from "../controllers/getOne";
import { createHistoricalFigure } from "../controllers/createHistoricalFigure";
import { deleteHistoricalFigure } from "../controllers/deleteHistoricalFigure";
import { updateHistoricalFigure } from "../controllers/updateHistoricalFigure";

export const router = express.Router();

router.get("/historicalfigures", getAllFiltered);
router.get("/historicalfigures/:id", getOne);
router.get("/historicalfigures/filter/:field/:term", getDataByPathParams);
router.post("/historicalfigures", createHistoricalFigure);
router.put("/historicalfigures/:id", updateHistoricalFigure);
router.delete("/historicalfigures/:id", deleteHistoricalFigure);
