import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom-error";

export function error(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || "An unexpected error occurred";

  res.status(status).json({ msg: message });
}
