import { Request, Response } from "express";
import { ResponseLoginData } from "../models/responses/ResponseLoginData";
import { cookieSet } from "./cookieSet";
import { EnumAuthCookies } from "../models/enums/EnumAuthCookies";

export function setLoginData(
	req: Request,
	res: Response,
	loginData: ResponseLoginData
) {
	if (req.axiosConfig !== undefined) {
		req.axiosConfig.headers = {
			...req.axiosConfig?.headers,
			accessToken: loginData.access_token,
			refreshToken: loginData.refresh_token,
		};
	}

	cookieSet(
		res,
		EnumAuthCookies.ACCESS_TOKEN,
		loginData.access_token,
		loginData.expires_in
	);

	cookieSet(
		res,
		EnumAuthCookies.REFRESH_TOKEN,
		loginData.refresh_token,
		loginData.refresh_expires_in
	);
}
