import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/utils/CustomError";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};
