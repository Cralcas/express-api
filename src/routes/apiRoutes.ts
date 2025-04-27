import express from "express";
import { getDataByPathParams } from "../controllers/getDataByPathParam";
import { getAllFiltered } from "../controllers/getAllData";

export const router = express.Router();

router.get("/", getAllFiltered);
router.get("/:field/:term", getDataByPathParams);
