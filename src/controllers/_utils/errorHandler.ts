import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../models/utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { AxiosError } from "axios";
import { EnumError } from "../../models/enums/EnumError";
import {printer} from "../../utils/printer";

export const errorHandler = (
  err: CustomError | AxiosError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  printer("App::handler::Error")

  const defaultStatusError = StatusCodes.INTERNAL_SERVER_ERROR;
  const defaultMessageError = "Something went wrong";

  let status = defaultStatusError;
  let message: string | string[] = defaultMessageError;

  if (err instanceof AxiosError) {
    status = err.response?.status || defaultStatusError;
  } else if (err.name == EnumError.KEY_CUSTOM_ERROR) {
    status = err.status || defaultStatusError;
    message = err.messages || err.message || defaultMessageError;
  }

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};
