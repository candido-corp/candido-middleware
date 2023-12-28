import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { StatusCodes } from "http-status-codes";
import { API_V1_logout } from "../../axios/v1/auth/API_V1_logout";
import { AxiosResponse } from "axios";
import { cookieDelete } from "../../utils/cookieDelete";
import { EnumAuthCookies } from "../../models/enums/EnumAuthCookies";

export const controllerLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await API_V1_logout();

    cookieDelete(res, EnumAuthCookies.ACCESS_TOKEN);
    cookieDelete(res, EnumAuthCookies.REFRESH_TOKEN);

    // Esempio di risposta
    res.status(StatusCodes.OK).send({});
  } catch (error) {
    next(error);
  }
};
