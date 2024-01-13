import { NextFunction, Request, Response } from "express";
import { AxiosResponse } from "axios";
import { API_V1_account } from "../../axios/v1/account/API_V1_account";

export const controllerAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const axiosResponse: AxiosResponse = await API_V1_account(req.axiosConfig);

    console.log(axiosResponse);

    res.status(axiosResponse.status).send(axiosResponse.data);
  } catch (error: any) {
    next(error);
  }
};
