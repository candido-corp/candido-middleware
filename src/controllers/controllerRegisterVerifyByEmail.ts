import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {printerController} from "../utils/customPrinter";
import RegisterEmailBasedService from "../service/auth/register/email/RegisterEmailBasedService";

export const controllerRegisterVerifyByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  printerController("Register verify by email");
  try {
    await new RegisterEmailBasedService().registerVerify(req, res);
    res.status(StatusCodes.NO_CONTENT).send({});
  } catch (error) {
    next(error);
  }
};
