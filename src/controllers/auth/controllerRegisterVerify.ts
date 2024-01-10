import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createError } from "../../utils/createError";
import { API_V1_register_verify } from "../../axios/v1/auth/API_V1_register_verify";
import { RequestRegisterVerifyData } from "../../models/requests/RequestRegisterVerifyData";

export const controllerRegisterVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token }: RequestRegisterVerifyData = req.params;

    if (!token) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing token");
    }

    await API_V1_register_verify(token);

    res.status(StatusCodes.OK).send({});
  } catch (error) {
    next(error);
  }
};
