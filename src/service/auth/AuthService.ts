import { AuthServiceInterface } from "./AuthServiceInterface";
import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { RequestLoginData } from "../../models/requests/RequestLoginData";
import { createError } from "../../utils/createError";
import { StatusCodes } from "http-status-codes";
import { API_V1_login } from "../../axios/v1/auth/API_V1_login";
import { API_V1_refresh_token } from "../../axios/v1/auth/API_V1_refresh_token";
import { API_V1_logout } from "../../axios/v1/auth/API_V1_logout";
import { RequestRegisterData } from "../../models/requests/RequestRegisterData";
import { API_V1_register } from "../../axios/v1/auth/API_V1_register";
import { API_V1_register_verify } from "../../axios/v1/auth/API_V1_register_verify";
import { RequestRegisterVerifyData } from "../../models/requests/RequestRegisterVerifyData";

export default class AuthService implements AuthServiceInterface {
  public async register(req: Request, res: Response): Promise<AxiosResponse> {
    const { email, password, confirm_password }: RequestRegisterData = req.body;

    if (!email || !password || !confirm_password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        "Missing email or password or confirm_password"
      );
    }

    return await API_V1_register(email, password, confirm_password);
  }

  public async registerVerify(
    req: Request,
    res: Response
  ): Promise<AxiosResponse> {
    const { token }: RequestRegisterVerifyData = req.params;

    if (!token) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing token");
    }

    return await API_V1_register_verify(token);
  }

  public async login(req: Request, res: Response): Promise<AxiosResponse> {
    const { email, password }: RequestLoginData = req.body;

    if (!email || !password) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing email or password");
    }

    return await API_V1_login(email, password);
  }

  public async refresh(req: Request, res: Response): Promise<AxiosResponse> {
    if (req.axiosConfig === undefined) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing configuration");
    }

    return await API_V1_refresh_token(req.axiosConfig);
  }

  public async logout(req: Request, res: Response): Promise<AxiosResponse> {
    if (
      req.axiosConfig === undefined ||
      req.axiosConfig?.headers?.accessToken === undefined
    ) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing configuration");
    }

    return await API_V1_logout(req.axiosConfig);
  }
}
