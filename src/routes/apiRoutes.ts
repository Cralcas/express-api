import express from "express";

import {
  getAll,
  getOne,
  createMonarch,
  updateMonarch,
  deleteMonarch,
  getAllFiltered,
  getDataByPathParams,
} from "../controllers/index.js";
import { validateFilterParams, validateIdParam, validateMonarch, validateSearch } from "../middleware/index.js";

export const router = express.Router();

router.get("/monarchs/search", validateSearch, getAllFiltered);
router.get("/monarchs", getAll);
router.get("/monarchs/:id", validateIdParam("id"), getOne);
router.get("/monarchs/filter/:field/:term", validateFilterParams, getDataByPathParams);
router.post("/monarchs", validateMonarch.validateCreateMonarch, createMonarch);
router.put("/monarchs/:id", validateIdParam("id"), validateMonarch.validateUpdateMonarch, updateMonarch);
router.delete("/monarchs/:id", validateIdParam("id"), deleteMonarch);
