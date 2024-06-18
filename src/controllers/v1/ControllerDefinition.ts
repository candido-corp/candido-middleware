import {NextFunction} from "express";
import NetworkClient from "../../data/NetworkClient";
import {StatusCodes} from "http-status-codes";
import {setLoginData} from "../../utils/setLoginData";
import {setLogoutData} from "../../utils/setLogoutData";
import {EnumControllerName} from "../../data/enums/EnumControllerName";

/**
 * Create a default protected controller
 * @param func - The function to call
 */
function createDefaultProtectedController(func: Function) {
	return async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		let response = await originalApiCall(req.axiosConfig, func);
		res.status(response.status).send(response.data);
	};
}

/**
 * Create a default public controller
 * @param func - The function to call
 */
function createDefaultPublicController(func: Function) {
	return async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		await originalApiCall(req.axiosConfig, func);
		res.status(StatusCodes.NO_CONTENT).send();
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

	[EnumControllerName.controllerRegisterCode]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.registerCode);
		res.status(StatusCodes.OK).send({t: axiosResponse.data.t});
	},

	[EnumControllerName.controllerResetPasswordChangePassword]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.resetPasswordChangePassword);
		setLoginData(req, res, axiosResponse.data);
		res.status(axiosResponse.status).send(axiosResponse.data);
	},

	[EnumControllerName.controllerRegisterEmail]: createDefaultPublicController(NetworkClient.registerEmail),
	[EnumControllerName.controllerRegisterEmailVerify]: createDefaultPublicController(NetworkClient.registerEmailVerify),
	[EnumControllerName.controllerRegisterCodeResend]: createDefaultProtectedController(NetworkClient.registerCodeResend),
	[EnumControllerName.controllerRegisterCodeVerify]: createDefaultProtectedController(NetworkClient.registerCodeVerify),
	[EnumControllerName.controllerResetPasswordSend]: createDefaultPublicController(NetworkClient.resetPasswordSend),
	[EnumControllerName.controllerResetPasswordCheckValidity]: createDefaultPublicController(NetworkClient.resetPasswordCheckValidity),

	[EnumControllerName.controllerAccount]: createDefaultProtectedController(NetworkClient.getAccount),
	[EnumControllerName.controllerAccountDetail]: createDefaultProtectedController(NetworkClient.getAccountDetails),
	[EnumControllerName.controllerAccountPassword]: createDefaultProtectedController(NetworkClient.changeAccountPassword),

	[EnumControllerName.controllerGender]: createDefaultProtectedController(NetworkClient.getGenders)
};
