import { NextFunction, Request, Response } from "express";
import { cookieGet } from "../utils/cookieGet";
import { EnumAuthCookies } from "../models/enums/EnumAuthCookies";
import {customPrinter, printerController} from "../utils/customPrinter";

export const controllerEntrypoint = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printerController("EntryPoint")

	const axiosConfig = req.axiosConfig || {};

	axiosConfig.headers = {
		...axiosConfig.headers,
		accessToken: cookieGet(req, EnumAuthCookies.ACCESS_TOKEN),
		refreshToken: cookieGet(req, EnumAuthCookies.REFRESH_TOKEN),
	};

	req.axiosConfig = axiosConfig;
	next();
};
