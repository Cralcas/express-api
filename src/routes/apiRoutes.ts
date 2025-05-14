import express from "express";
import { getAllFiltered } from "../controllers/getAllFiltered.js";
import { getOne } from "../controllers/getOne.js";
import { getDataByPathParams } from "../controllers/getDataByPathParams.js";
import { createMonarch } from "../controllers/createMonarch.js";
import { deleteMonarch } from "../controllers/deleteMonarch.js";
import { updateMonarch } from "../controllers/updateMonarch.js";
import { validateCreateMonarch, validateUpdateMonarch } from "../middleware/validateMonarch.js";
import { validateIdParam } from "../middleware/validateIdParams.js";
import { validateFilterParams } from "../middleware/validateFilterParam.js";

export const router = express.Router();

router.get("/monarchs/search", getAllFiltered);
router.get("/monarchs", getAllFiltered);
router.get("/monarchs/:id", validateIdParam("id"), getOne);
router.get("/monarchs/filter/:field/:term", validateFilterParams, getDataByPathParams);
router.post("/monarchs", validateCreateMonarch, createMonarch);
router.put("/monarchs/:id", validateIdParam("id"), validateUpdateMonarch, updateMonarch);
router.delete("/monarchs/:id", validateIdParam("id"), deleteMonarch);
