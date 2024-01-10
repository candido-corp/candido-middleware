import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { RequestRegisterData } from "../../models/requests/RequestRegisterData";
import { StatusCodes } from "http-status-codes";
import { API_V1_register } from "../../axios/v1/auth/API_V1_register";

export const controllerRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, confirm_password }: RequestRegisterData =
      req.body;

    if (!email || !password || !confirm_password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        "Missing email or password or confirm_password"
      );
    }

    await API_V1_register(email, password, confirm_password);

    res.status(StatusCodes.OK).send({});
  } catch (error) {
    next(error);
  }
};
