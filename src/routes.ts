import express, {NextFunction, Router} from "express";

import {EnumController} from "./controllers/v1/_controller";
import {Controller} from "./controllers/v1/Controller";

const router = express.Router();
type HttpMethod = keyof Router;

interface RouteConfig {
	access: ControllerType;
	method: HttpMethod;
	path: string;
	controller: EnumController;
}

export enum ControllerType {
	PROTECTED, PUBLIC
}

export function isControllerPublic(controllerType: ControllerType): boolean {
	return controllerType === ControllerType.PUBLIC;
}

const protectedRoutes: RouteConfig[] = [
	{ access: ControllerType.PUBLIC, method: 'post', path: '/api/v1/auth/login', controller: EnumController.controllerLogin },
	{ access: ControllerType.PUBLIC, method: 'post', path: '/api/v1/auth/logout', controller: EnumController.controllerLogout },
	{ access: ControllerType.PUBLIC, method: 'post', path: '/api/v1/auth/register/email', controller: EnumController.controllerRegisterEmail },
	{ access: ControllerType.PUBLIC, method: 'post', path: '/api/v1/auth/register/email/verify', controller: EnumController.controllerRegisterEmailVerify },
	{ access: ControllerType.PUBLIC, method: 'post', path: '/api/v1/auth/register/code', controller: EnumController.controllerRegisterCode },
	{ access: ControllerType.PUBLIC, method: 'post', path: '/api/v1/auth/register/code/resend', controller: EnumController.controllerRegisterCodeResend },
	{ access: ControllerType.PUBLIC, method: 'post', path: '/api/v1/auth/register/code/verify', controller: EnumController.controllerRegisterCodeVerify },
	{ access: ControllerType.PUBLIC, method: 'post', path: '/api/v1/auth/reset-password/send', controller: EnumController.controllerResetPasswordSend },
	{ access: ControllerType.PUBLIC, method: 'post', path: '/api/v1/auth/reset-password/change-password', controller: EnumController.controllerResetPasswordChangePassword },
	{ access: ControllerType.PUBLIC, method: 'get', path: '/api/v1/auth/reset-password/check-validity', controller: EnumController.controllerResetPasswordCheckValidity },

	{ access: ControllerType.PROTECTED, method: 'get', path: '/api/v1/me', controller: EnumController.controllerAccount },
	{ access: ControllerType.PROTECTED, method: 'get', path: '/api/v1/me/details', controller: EnumController.controllerAccountDetail },
	{ access: ControllerType.PROTECTED, method: 'put', path: '/api/v1/me/password', controller: EnumController.controllerAccountPassword }
];

protectedRoutes.forEach(route => {
	if (route.method in router) {
		(router[route.method] as Function).call(router, route.path,
			(req: any, res: any, next: NextFunction) =>
			Controller(req, res, next, route.controller, route.access)
		);
	}
});

export default router;
