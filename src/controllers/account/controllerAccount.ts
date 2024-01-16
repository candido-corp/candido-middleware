import { NextFunction, Request, Response } from "express";
import { AxiosResponse } from "axios";
import { API_V1_account } from "../../axios/v1/account/API_V1_account";
import { CustomAxiosConfig } from "../../models/interfaces/CustomAxiosConfig";
import { printer } from "../../utils/printer";

export const controllerAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  printer("App:controller::Account")

  const originalApiCall = async (
    axiosConfig?: CustomAxiosConfig
  ): Promise<AxiosResponse> => {
    return await API_V1_account(axiosConfig);
  };

  try {
    const axiosResponse: AxiosResponse = await originalApiCall(req.axiosConfig);
    res.status(axiosResponse.status).send(axiosResponse.data);
  } catch (error: any) {
    error.originalApiCall = originalApiCall;
    next(error);
  }
};
