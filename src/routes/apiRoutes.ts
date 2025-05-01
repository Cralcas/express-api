import express from "express";
import { getAllFiltered } from "../controllers/getAllFiltered";
import { getDataByPathParams } from "../controllers/getDataByPathParams";
import { getOne } from "../controllers/getOne";
import { createMonarch } from "../controllers/createMonarch";
import { deleteMonarch } from "../controllers/deleteMonarch";
import { updateMonarch } from "../controllers/updateMonarch";

export const router = express.Router();

router.get("/monarchs", getAllFiltered);
router.get("/monarchs/:id", getOne);
router.get("/monarchs/filter/:field/:term", getDataByPathParams);
router.post("/monarchs", createMonarch);
router.put("/monarchs/:id", updateMonarch);
router.delete("/monarchs/:id", deleteMonarch);
