import {NextFunction} from "express";
import NetworkClient from "../../data/NetworkClient";
import {StatusCodes} from "http-status-codes";
import {setLoginData} from "../../utils/setLoginData";
import {setLogoutData} from "../../utils/setLogoutData";
import {EnumControllerName} from "../../data/enums/EnumControllerName";
import {CustomAxiosConfig} from "../../config/ConfigAxios";
import {AxiosResponse} from "axios";

/**
 * Original API call
 * @param req - The request
 * @param func - The function to call
 */
export const originalApiCall = async (req: any, func?: Function): Promise<AxiosResponse> => {
	let { axiosConfig } = req;
	return await func?.bind(NetworkClient)({
		...(axiosConfig && {axiosConfig: axiosConfig}),
		...(req.body && {data: req.body}),
		...(req.params && {params: req.params}),
	});
};

/**
 * The response type of any call
 */
export type CallResponseType = {
	status: number;
	data: any;
}

/**
 * Create object for response of call
 * @param status - The status
 * @param data - The data
 */
export const callResponse = (status: any, data: any): CallResponseType => {
	return {
		status,
		data
	};
}


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
		return callResponse(response.status, response.data);
	},

	[EnumControllerName.controllerRegisterEmail]:  async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const response = await originalApiCall(req, NetworkClient.registerEmail);
		setLoginData(req, res, response.data)
		return callResponse(StatusCodes.NO_CONTENT, null);
	},

	[EnumControllerName.controllerRegisterCodeVerify]:   async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const response = await originalApiCall(req, NetworkClient.registerCodeVerify);
		setLoginData(req, res, response.data)
		return callResponse(StatusCodes.NO_CONTENT, null);
	},

	[EnumControllerName.controllerRegisterEmailVerify]: createDefaultController(NetworkClient.registerEmailVerify),
	[EnumControllerName.controllerRegisterCode]: createDefaultController(NetworkClient.registerCode),
	[EnumControllerName.controllerRegisterCodeResend]: createDefaultController(NetworkClient.registerCodeResend),
	[EnumControllerName.controllerResetPasswordSend]: createDefaultController(NetworkClient.resetPasswordSend),
	[EnumControllerName.controllerResetPasswordCheckValidity]: createDefaultController(NetworkClient.resetPasswordCheckValidity),

	[EnumControllerName.controllerAccount]: createDefaultController(NetworkClient.getAccount),
	[EnumControllerName.controllerAccountDetail]: createDefaultController(NetworkClient.getAccountDetails),
	[EnumControllerName.controllerAccountPassword]: createDefaultController(NetworkClient.changeAccountPassword),

	[EnumControllerName.controllerGender]: createDefaultController(NetworkClient.getGenders)
};
