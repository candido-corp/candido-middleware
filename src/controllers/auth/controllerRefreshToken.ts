import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../models/utils/CustomError";
import { EnumServerRoutes } from "../../models/enums/EnumServerRoutes";
import { AxiosError, AxiosResponse } from "axios";
import { API_V1_refresh_token } from "../../axios/v1/auth/API_V1_refresh_token";
import { setLogoutData } from "./controllerLogout";
import { setLoginData } from "./controllerLogin";

export const controllerRefreshToken = async (
  err: AxiosError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = err.response?.status;
    const url = req.url;
    console.log("controllerRefreshToken", req.url);
    console.log("status", status);
    if (status === StatusCodes.UNAUTHORIZED) {
      console.log("jjj", url);
      const refreshTokenResponse: AxiosResponse = await API_V1_refresh_token(
        req.axiosConfig
      );
      console.log("refreshTokenResponse", refreshTokenResponse.data);

      setLoginData(res, refreshTokenResponse.data);
    }

    res.status(200).send({});
  } catch (error) {
    setLogoutData(res);
    next(err);
  }
};
