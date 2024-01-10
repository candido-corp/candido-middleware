import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { RequestLoginData } from "../../models/requests/RequestLoginData";
import { StatusCodes } from "http-status-codes";
import { API_V1_login } from "../../axios/v1/auth/API_V1_login";
import { AxiosResponse } from "axios";
import { ResponseLoginData } from "../../models/responses/ResponseLoginData";
import { cookieSet } from "../../utils/cookieSet";
import { EnumAuthCookies } from "../../models/enums/EnumAuthCookies";

export const controllerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: RequestLoginData = req.body;

    if (!email || !password) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing email or password");
    }

    const axiosResponse: AxiosResponse = await API_V1_login(email, password);

    console.log("axiosResponse:", axiosResponse);

    setLoginData(res, axiosResponse.data);

    res.status(StatusCodes.OK).send({});
  } catch (error) {
    next(error);
  }
};

export const setLoginData = (
  res: Response,
  {
    access_token,
    expires_in,
    refresh_token,
    refresh_expires_in,
  }: ResponseLoginData
) => {
  cookieSet(res, EnumAuthCookies.ACCESS_TOKEN, access_token, expires_in);

  cookieSet(
    res,
    EnumAuthCookies.REFRESH_TOKEN,
    refresh_token,
    refresh_expires_in
  );
};
