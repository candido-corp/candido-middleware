import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { RequestRegisterData } from "../../models/requests/RequestRegisterData";
import { StatusCodes } from "http-status-codes";
import { API_V1_register } from "../../axios/v1/auth/API_V1_register";
import { AxiosResponse } from "axios";

export const controllerRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, confirm_password }: RequestRegisterData =
      req.body;

    if (!username || !password || !confirm_password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        "Missing username or password or confirm_password"
      );
    }

    await API_V1_register(username, password, confirm_password);

    // Esempio di risposta
    res.status(StatusCodes.OK).send({});
  } catch (error) {
    next(error);
  }
};
