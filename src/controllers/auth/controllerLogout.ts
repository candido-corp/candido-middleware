import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { API_V1_logout } from "../../axios/v1/auth/API_V1_logout";
import { cookieDelete } from "../../utils/cookieDelete";
import { EnumAuthCookies } from "../../models/enums/EnumAuthCookies";
import { createError } from "../../utils/createError";
import { AxiosResponse } from "axios";

export const controllerLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const axiosResponse: AxiosResponse = await API_V1_logout(req.axiosConfig);

    if (res.statusCode === StatusCodes.BAD_REQUEST) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing access_token");
    }

    setLogoutData(res);

    res.status(axiosResponse.status).send({});
  } catch (error) {
    next(error);
  }
};

export const setLogoutData = (res: Response) => {
  console.log("logout");
  cookieDelete(res, EnumAuthCookies.ACCESS_TOKEN);
  cookieDelete(res, EnumAuthCookies.REFRESH_TOKEN);
};
