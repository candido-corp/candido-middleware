import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {printerController} from "../../../../utils/printer";
import RegisterCodeBasedService from "../../../../service/auth/register/code/RegisterCodeBasedService";

export const controllerRegisterCodeVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  printerController("Register code based")
  try {
    let response = await new RegisterCodeBasedService().register(req, res);
    res.status(StatusCodes.OK).send({
      session_id: response.data.session_id
    });
  } catch (error) {
    next(error);
  }
};
