import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {printerController} from "../../../../utils/printer";
import RegisterCodeBasedService from "../../../../service/auth/register/code/RegisterCodeBasedService";

export const controllerRegisterVerifyByCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  printerController("Register verify by code")
  try {
    await new RegisterCodeBasedService().registerResendCode(req, res);
    res.status(StatusCodes.NO_CONTENT).send({});
  } catch (error) {
    next(error);
  }
};
