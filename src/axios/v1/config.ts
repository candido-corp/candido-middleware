import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { cookieGet } from "../../utils/cookieGet";
import { EnumAuthCookies } from "../../models/enums/EnumAuthCookies";
import { StatusCodes } from "http-status-codes";
import { API_V1_refresh_token } from "./auth/API_V1_refresh_token";
import { setLoginData } from "../../controllers/auth/controllerLogin";
import { setLogoutData } from "../../controllers/auth/controllerLogout";

dotenv.config();

export const handleAuthorizationAndCookies = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const axiosConfig = req.axiosConfig || {};
  axiosConfig.headers = {
    ...axiosConfig.headers,
    accessToken: cookieGet(req, EnumAuthCookies.ACCESS_TOKEN),
    refreshToken: cookieGet(req, EnumAuthCookies.REFRESH_TOKEN),
  };

  req.axiosConfig = axiosConfig;
  next();
};

const axiosInstanceApiV1: AxiosInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceApiV1.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const accessToken = config.headers.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceApiV1.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    const response = error.response;

    console.log("response:", response);

    if (response) {
      if (
        response.status === StatusCodes.UNAUTHORIZED &&
        !originalConfig._retry &&
        response.config.headers.refreshToken
      ) {
        console.log("originalConfig:", originalConfig._retry);
        originalConfig._retry = true;

        try {
          const refreshTokenResponse: AxiosResponse =
            await API_V1_refresh_token(response.config.headers.refreshToken);

          console.log("refreshTokenResponse:", refreshTokenResponse);

          return setLoginData(response, refreshTokenResponse.data);
        } catch (_error: any) {
          setLogoutData(response);
          console.log("_error:", _error);

          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (error.response.data) {
        return Promise.reject(error.response.data);
      }
    }

    console.log("error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstanceApiV1;
