import { Response, Request, NextFunction } from "express";
import { CustomError } from "../utils/custom-error.js";

export function notFound(req: Request, res: Response, next: NextFunction) {
  return next(new CustomError("Route not found", 404));
}
