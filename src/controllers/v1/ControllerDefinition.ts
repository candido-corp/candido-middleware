import {NextFunction} from "express";
import NetworkClient from "../../data/NetworkClient";
import {StatusCodes} from "http-status-codes";
import {setLoginData} from "../../utils/setLoginData";
import {setLogoutData} from "../../utils/setLogoutData";
import {EnumControllerName} from "../../data/enums/EnumControllerName";

/**
 * Create a default controller
 * @param func - The function to call
 */
function createDefaultController(func: Function) {
	return async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		let response = await originalApiCall(req.axiosConfig, func);
		res.status(response.status).send(response.data);
	};
}

/**
 * Controller map
 */
export const controllerMap = {
	[EnumControllerName.controllerLogin]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.login);
		setLoginData(req, res, axiosResponse.data);
		res.status(StatusCodes.NO_CONTENT).send();
	},

	[EnumControllerName.controllerLogout]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.logout);
		setLogoutData(res);
		res.status(axiosResponse.status).send(axiosResponse.data);
	},

	[EnumControllerName.controllerResetPasswordChangePassword]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.resetPasswordChangePassword);
		setLoginData(req, res, axiosResponse.data);
		res.status(axiosResponse.status).send(axiosResponse.data);
	},

	[EnumControllerName.controllerRegisterEmail]:  async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.registerEmail);
		setLoginData(req, res, axiosResponse.data)
		res.status(StatusCodes.NO_CONTENT).send();
	},

	[EnumControllerName.controllerRegisterEmailVerify]: createDefaultController(NetworkClient.registerEmailVerify),
	[EnumControllerName.controllerRegisterCode]: createDefaultController(NetworkClient.registerCode),
	[EnumControllerName.controllerRegisterCodeResend]: createDefaultController(NetworkClient.registerCodeResend),
	[EnumControllerName.controllerRegisterCodeVerify]: createDefaultController(NetworkClient.registerCodeVerify),
	[EnumControllerName.controllerResetPasswordSend]: createDefaultController(NetworkClient.resetPasswordSend),
	[EnumControllerName.controllerResetPasswordCheckValidity]: createDefaultController(NetworkClient.resetPasswordCheckValidity),

	[EnumControllerName.controllerAccount]: createDefaultController(NetworkClient.getAccount),
	[EnumControllerName.controllerAccountDetail]: createDefaultController(NetworkClient.getAccountDetails),
	[EnumControllerName.controllerAccountPassword]: createDefaultController(NetworkClient.changeAccountPassword),

	[EnumControllerName.controllerGender]: createDefaultController(NetworkClient.getGenders)
};
