import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { RequestLoginData } from "../../models/requests/RequestLoginData";
import { StatusCodes } from "http-status-codes";
import { API_V1_login } from "../../axios/v1/auth/API_V1_login";
import { AxiosResponse } from "axios";
import { ResponseLoginData } from "../../models/responses/ResponseLoginData";
import { cookieSet } from "../../utils/cookieSet";
import { EnumAuthCookies } from "../../models/enums/EnumAuthCookies";
import { updateAccessToken } from "../../utils/auth";

export const controllerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password }: RequestLoginData = req.body;

    if (!username || !password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        "Missing username or password"
      );
    }

    const axiosResponse: AxiosResponse = await API_V1_login(username, password);
    const {
      access_token,
      expires_in,
      refresh_token,
      refresh_expires_in,
    }: ResponseLoginData = axiosResponse.data;

    cookieSet(res, EnumAuthCookies.ACCESS_TOKEN, access_token, expires_in);

    cookieSet(
      res,
      EnumAuthCookies.REFRESH_TOKEN,
      refresh_token,
      refresh_expires_in
    );

    updateAccessToken(req);

    res.status(StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
