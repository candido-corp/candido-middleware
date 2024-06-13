import {NextFunction, Request, Response} from "express";
import {cookieGet} from "../../utils/cookieGet";
import {EnumAuthCookies} from "../../data/enums/EnumAuthCookies";
import printer from "../../utils/customPrinter";

export const controllerEntrypoint = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printer.controller(controllerEntrypoint.name + " called");

	const axiosConfig = req.axiosConfig || {};

	axiosConfig.headers = {
		...axiosConfig.headers,
		accessToken: cookieGet(req, EnumAuthCookies.ACCESS_TOKEN),
		refreshToken: cookieGet(req, EnumAuthCookies.REFRESH_TOKEN),
	};

	req.axiosConfig = axiosConfig;
	next();
};
