import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/utils/CustomError";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};
