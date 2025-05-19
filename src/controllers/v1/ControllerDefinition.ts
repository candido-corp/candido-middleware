import {NextFunction} from "express";
import NetworkClient from "../../data/NetworkClient";
import {StatusCodes} from "http-status-codes";
import {setLoginData} from "../../utils/setLoginData";
import {setLogoutData} from "../../utils/setLogoutData";
import {EnumControllerName} from "../../data/enums/EnumControllerName";
import {AxiosResponse} from "axios";
import {
  RequestRegisterVerify,
  RequestRegisterVerifyType,
} from "../../data/requests/RequestRegisterVerify";
import {
  RequestRegister,
  RequestRegisterType,
} from "../../data/requests/RequestRegister";

/**
 * Original API call
 * @param req - The request
 * @param func - The function to call
 */
export const originalApiCall = async (
  req: any,
  func?: Function
): Promise<AxiosResponse> => {
  let {axiosConfig} = req;
  return await func?.bind(NetworkClient)({
    ...(axiosConfig && {axiosConfig: axiosConfig}),
    ...(req.body && {data: req.body}),
    ...(req.query && {params: req.query}),
    ...(req.params && {pathParams: {...req.params}}),
  });
};

/**
 * The response type of any call
 */
export type CallResponseType = {
  status: number;
  data: any;
};

/**
 * Create object for response of call
 * @param status - The status
 * @param data - The data
 */
export const callResponse = (status: any, data: any): CallResponseType => {
  return {
    status,
    data,
  };
};

/**
 * Create a default controller
 * @param func - The function to call
 */
function createDefaultController(func: Function) {
  return async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
    let response = await originalApiCall(req, func);
    return callResponse(response.status, response.data);
  };
}

/**
 * Controller map
 */
export const controllerMap = {
  [EnumControllerName.controllerLogin]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
    const response = await originalApiCall(req, NetworkClient.login);
    setLoginData(req, res, response.data);
    return callResponse(StatusCodes.NO_CONTENT, null);
  },

  [EnumControllerName.controllerLogout]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
    const response = await originalApiCall(req, NetworkClient.logout);
    setLogoutData(res);
    return callResponse(response.status, response.data);
  },

  [EnumControllerName.controllerRefreshToken]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
    const response = await originalApiCall(req, NetworkClient.refreshToken);
    setLoginData(req, res, response.data);
    return callResponse(StatusCodes.NO_CONTENT, null);
  },

  [EnumControllerName.controllerResetPasswordChangePassword]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
    const response = await originalApiCall(req, NetworkClient.resetPasswordChangePassword);
    setLoginData(req, res, response.data);
    return callResponse(StatusCodes.NO_CONTENT, null);
  },

  [EnumControllerName.controllerRegister]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
    const request: RequestRegister = req.body;
    const method: Function =
      request.a == RequestRegisterType.EMAIL
        ? NetworkClient.registerEmail
        : NetworkClient.registerCode;

    const response = await originalApiCall(req, method);
    setLoginData(req, res, response.data);
    return request.a == RequestRegisterType.EMAIL
      ? callResponse(StatusCodes.NO_CONTENT, null)
      : callResponse(StatusCodes.OK, response.data);
  },

  [EnumControllerName.controllerRegisterVerify]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
    const request: RequestRegisterVerify = req.body;
    const method: Function =
      request.a == RequestRegisterVerifyType.EMAIL
        ? NetworkClient.registerEmailVerify
        : NetworkClient.registerCodeVerify;

    const response = await originalApiCall(req, method);
    setLoginData(req, res, response.data);
    return callResponse(StatusCodes.NO_CONTENT, null);
  },

  [EnumControllerName.controllerGeosChildren]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
    const response = await originalApiCall(req, NetworkClient.getCountriesChildren);
    return callResponse(response.status, response.data);
  },

  [EnumControllerName.controllerRegisterEmailResend]: createDefaultController(NetworkClient.registerEmailResend),
  [EnumControllerName.controllerRegisterCodeResend]: createDefaultController(NetworkClient.registerCodeResend),
  [EnumControllerName.controllerResetPasswordSend]: createDefaultController(NetworkClient.resetPasswordSend),
  [EnumControllerName.controllerResetPasswordCheckValidity]: createDefaultController(NetworkClient.resetPasswordCheckValidity),

  [EnumControllerName.controllerAccount]: createDefaultController(NetworkClient.getAccount),
  [EnumControllerName.controllerAccountDetail]: createDefaultController(NetworkClient.getAccountDetails),
  [EnumControllerName.controllerAccountChangeDetail]: createDefaultController(NetworkClient.changeAccountDetails),
  [EnumControllerName.controllerAccountPassword]: createDefaultController(NetworkClient.changeAccountPassword),

  [EnumControllerName.controllerGender]: createDefaultController(NetworkClient.getGenders),
  [EnumControllerName.controllerGeos]: createDefaultController(NetworkClient.getCountries),

  [EnumControllerName.controllerApplications]: createDefaultController(NetworkClient.getApplications),
};
