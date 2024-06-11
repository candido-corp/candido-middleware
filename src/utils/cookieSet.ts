import { Response } from "express";
import {ConfigApp, isProduction} from "../config/ConfigApp";

export const cookieSet = (
	res: Response,
	name: string,
	value: string,
	maxAgeMillis?: number
) => {
	let defaultMaxAge = ConfigApp.cookie.defaultMaxAge;
	const cookieOptions = {
		httpOnly: false,
		secure: isProduction,
		sameSite: "strict" as const,
		maxAge: maxAgeMillis || defaultMaxAge
	};
	res.cookie(name, value, cookieOptions);
};
