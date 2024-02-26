import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AuthService from "../../service/auth/AuthService";
import {printer} from "../../utils/printer";

export const controllerRegisterCodeVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  printer("App:controller::Register::CodeVerification")
  try {
    let response = await new AuthService().registerCodeVerification(req, res);
    res.status(StatusCodes.OK).send({
      session_id: response.data.session_id
    });
  } catch (error) {
    next(error);
  }
};
