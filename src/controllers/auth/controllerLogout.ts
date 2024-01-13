import { NextFunction, Request, Response } from "express";
import { AxiosResponse } from "axios";
import {setLogoutData} from "../../utils/setLogoutData";
import AuthService from "../../service/auth/AuthService";

export const controllerLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const axiosResponse: AxiosResponse = await (new AuthService()).logout(req, res);
    setLogoutData(res);
    res.status(axiosResponse.status).send({});
  } catch (error) {
    next(error);
  }
};