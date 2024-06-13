import {NextFunction, Request} from "express";
import NetworkClient from "../../data/NetworkClient";
import {StatusCodes} from "http-status-codes";

export enum EnumController {
	controllerLogin = "controllerLogin",
	controllerLogout = "controllerLogout",
	controllerRegisterEmail = "controllerRegisterEmail",
	controllerRegisterEmailVerify = "controllerRegisterEmailVerify",
	controllerRegisterCode = "controllerRegisterCode",
	controllerRegisterCodeResend = "controllerRegisterCodeResend",
	controllerRegisterCodeVerify = "controllerRegisterCodeVerify",
	controllerResetPasswordSend = "controllerResetPasswordSend",
	controllerResetPasswordChangePassword = "controllerResetPasswordChangePassword",
	controllerResetPasswordCheckValidity = "controllerResetPasswordCheckValidity",
	controllerAccount = "controllerAccount",
	controllerAccountDetail = "controllerAccountDetail",
	controllerAccountPassword = "controllerAccountPassword",
	controllerGender = "controllerGender"
}

const controllerRegisterEmail = createPublicController(NetworkClient.registerEmail);
const controllerRegisterEmailVerify = createPublicController(NetworkClient.registerEmailVerify);
const controllerRegisterCodeResend = createPublicController(NetworkClient.registerCodeResend);
const controllerRegisterCodeVerify = createPublicController(NetworkClient.registerCodeVerify);
const controllerResetPasswordSend = createPublicController(NetworkClient.resetPasswordSend);
const controllerResetPasswordCheckValidity = createPublicController(NetworkClient.resetPasswordCheckValidity);
const controllerAccount = createProtectedController(NetworkClient.getAccount);
const controllerAccountDetail = createProtectedController(NetworkClient.getAccountDetails);
const controllerAccountPassword = createProtectedController(NetworkClient.changeAccountPassword);
const controllerGender = createProtectedController(NetworkClient.getGenders);

export const Controllers = {
	registerEmail: controllerRegisterEmail,
	registerEmailVerify: controllerRegisterEmailVerify,
	registerCodeResend: controllerRegisterCodeResend,
	registerCodeVerify: controllerRegisterCodeVerify,
	resetPasswordSend: controllerResetPasswordSend,
	resetPasswordCheckValidity: controllerResetPasswordCheckValidity,
	account: controllerAccount,
	accountDetail: controllerAccountDetail,
	accountPassword: controllerAccountPassword,
	genders: controllerGender
};

function createProtectedController(func: Function) {
	return async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		let response = await originalApiCall(req.axiosConfig, func);
		res.status(response.status).send(response.data);
	};
}

function createPublicController(func: Function) {
	return async (req: any, res: any, next: NextFunction, originalApiCall: Function) => {
		await originalApiCall(req.axiosConfig, func);
		res.status(StatusCodes.NO_CONTENT).send();
	};
}