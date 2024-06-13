import {NextFunction} from "express";
import NetworkClient from "../../data/NetworkClient";
import {StatusCodes} from "http-status-codes";
import {Controllers, EnumController} from "./_controller";
import {setLoginData} from "../../utils/setLoginData";
import {setLogoutData} from "../../utils/setLogoutData";


export const controllerMap = {
	[EnumController.controllerLogin]:  async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.login);
		setLoginData(req, res, axiosResponse.data);
		res.status(StatusCodes.NO_CONTENT).send();
	},

	[EnumController.controllerLogout]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.logout);
		setLogoutData(res);
		res.status(axiosResponse.status).send(axiosResponse.data);
	},

	[EnumController.controllerRegisterCode]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.registerCode);
		res.status(StatusCodes.OK).send({t: axiosResponse.data.t});
	},

	[EnumController.controllerResetPasswordChangePassword]: async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		const axiosResponse = await originalApiCall(req.axiosConfig, NetworkClient.resetPasswordChangePassword);
		setLoginData(req, res, axiosResponse.data);
		res.status(axiosResponse.status).send(axiosResponse.data);
	},

	[EnumController.controllerRegisterEmail]: Controllers.registerEmail,
	[EnumController.controllerRegisterEmailVerify]: Controllers.registerEmailVerify,
	[EnumController.controllerRegisterCodeResend]: Controllers.registerCodeResend,
	[EnumController.controllerRegisterCodeVerify]: Controllers.registerCodeVerify,
	[EnumController.controllerResetPasswordSend]: Controllers.resetPasswordSend,
	[EnumController.controllerResetPasswordCheckValidity]: Controllers.resetPasswordCheckValidity,

	[EnumController.controllerAccount]: Controllers.account,
	[EnumController.controllerAccountDetail]: Controllers.accountDetail,
	[EnumController.controllerAccountPassword]: Controllers.accountPassword,

	[EnumController.controllerGender]: Controllers.genders,
};
