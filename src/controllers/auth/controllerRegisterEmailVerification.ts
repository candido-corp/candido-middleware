import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AuthService from "../../service/auth/AuthService";
import {printer} from "../../utils/printer";

export const controllerRegisterEmailVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  printer("App:controller::Register::EmailVerification")
  try {
    await new AuthService().registerEmailVerification(req, res);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};
