import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {printerController} from "../../../../utils/printer";
import RegisterEmailBasedService from "../../../../service/auth/register/email/RegisterEmailBasedService";

export const controllerRegisterEmailVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  printerController("Register email based");
  try {
    await new RegisterEmailBasedService().register(req, res);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};
