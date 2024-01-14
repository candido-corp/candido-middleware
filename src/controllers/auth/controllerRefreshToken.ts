import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AxiosResponse } from "axios";
import { printer } from "../../utils/printer";
import AuthService from "../../service/auth/AuthService";
import { setLoginData } from "../../utils/setLoginData";
import { setLogoutData } from "../../utils/setLogoutData";

export const controllerRefreshToken = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  printer("RefreshTokenController");

  const status = err.response?.status;

  if (status === StatusCodes.UNAUTHORIZED) {
    printer("RefreshToken::fromUrl -> [{}] with status [{}]", req.url, status);

    try {
      const refreshTokenResponse: AxiosResponse =
        await new AuthService().refresh(req, res);
      setLoginData(req, res, refreshTokenResponse.data);
      printer("RefreshToken::retryRequest -> {}", req.url);
      const retryAxiosResponse: AxiosResponse = await err.originalApiCall(
        req.axiosConfig
      );
      res.status(retryAxiosResponse.status).send(retryAxiosResponse.data);
      return;
    } catch (error) {
      setLogoutData(res);
      next(err);
    }
  }

  next(err);
};
