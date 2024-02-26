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
import {
  API_V1_register_code_verification,
  API_V1_register_email_verification
} from "../../axios/v1/auth/API_V1_register_email_verification";
import {
  API_V1_register_verify_by_code,
  API_V1_register_verify_by_email
} from "../../axios/v1/auth/API_V1_register_verify_by_email";
import { RequestRegisterVerifyByEmailData } from "../../models/requests/RequestRegisterVerifyByEmailData";
import {RequestRegisterVerifyByCodeData} from "../../models/requests/RequestRegisterVerifyByCodeData";

export default class AuthService implements AuthServiceInterface {
  public async registerEmailVerification(req: Request, res: Response): Promise<AxiosResponse> {
    const { email, password, confirm_password, first_name, last_name }: RequestRegisterData = req.body;

    if (!email || !password || !confirm_password || !first_name || !last_name) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        "Missing email or password or confirm_password or first_name or last_name"
      );
    }

    return await API_V1_register_email_verification(email, password, confirm_password, first_name, last_name);
  }

  public async registerCodeVerification(req: Request, res: Response): Promise<AxiosResponse> {
    const { email, password, confirm_password, first_name, last_name }: RequestRegisterData = req.body;

    if (!email || !password || !confirm_password || !first_name || !last_name) {
      throw createError(
          StatusCodes.BAD_REQUEST,
          "Missing email or password or confirm_password or first_name or last_name"
      );
    }

    return await API_V1_register_code_verification(email, password, confirm_password, first_name, last_name);
  }

  public async registerVerifyByEmail(
    req: Request,
    res: Response
  ): Promise<AxiosResponse> {
    const { token }: RequestRegisterVerifyByEmailData = req.params;

    if (!token) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing token");
    }

    return await API_V1_register_verify_by_email(token);
  }

  public async registerVerifyByCode(
      req: Request,
      res: Response
  ): Promise<AxiosResponse> {
    const { session_id, temporary_code }: RequestRegisterVerifyByCodeData = req.params;

    if (!session_id || !temporary_code) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing session_id or temporary_code");
    }

    return await API_V1_register_verify_by_code(session_id, temporary_code);
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
