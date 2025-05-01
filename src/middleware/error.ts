import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom-error";

export function error(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  let message: unknown = err.message;

  try {
    message = JSON.parse(err.message);
  } catch {
    // Not JSON, keep the original string
  }

  res.status(status).json({ msg: message });
}
