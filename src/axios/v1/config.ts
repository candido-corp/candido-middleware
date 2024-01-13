import axios, {
  AxiosHeaders,
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
import { setLogoutData } from "../../controllers/auth/controllerLogout";
import { EnumServerRoutes } from "../../models/enums/EnumServerRoutes";

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
  withCredentials: true,
});

axiosInstanceApiV1.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = config.headers.accessToken || config.headers.refreshToken;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceApiV1.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    console.log("response", response.headers);
    return response;
  },
  async (error) => {
    return Promise.reject(error);
    const response = error.response;
    const originalConfig = error.config;

    if (response) {
      if (
        (response.status === StatusCodes.UNAUTHORIZED ||
          response.status === StatusCodes.BAD_REQUEST) &&
        response.config.url === EnumServerRoutes.REFRESH_TOKEN
      ) {
        console.log("refresh token expired", response);
        setLogoutData(response);
      } else if (
        response.status === StatusCodes.UNAUTHORIZED &&
        response.config.headers.refreshToken
      ) {
        console.log("salvato", response.config.headers.deleteCookie);
        const refreshTokenResponse: AxiosResponse = await API_V1_refresh_token({
          headers: {
            refreshToken: response.config.headers.refreshToken,
          },
        });

        originalConfig.headers = {
          ...originalConfig.headers,
          accessToken: refreshTokenResponse.data.access_token,
          refreshToken: refreshTokenResponse.data.refresh_token,
        };

        console.log("jòoiljkò", originalConfig.headers);

        return axiosInstanceApiV1(originalConfig);
      }

      if (error.response.data) {
        return Promise.reject(error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstanceApiV1;
