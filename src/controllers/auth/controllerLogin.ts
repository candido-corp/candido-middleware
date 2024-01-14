import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AxiosResponse } from "axios";
import AuthService from "../../service/auth/AuthService";
import { setLoginData } from "../../utils/setLoginData";

export const controllerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const axiosResponse: AxiosResponse = await new AuthService().login(
      req,
      res
    );
    setLoginData(req, res, axiosResponse.data);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};
