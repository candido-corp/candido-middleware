import {Response} from "express";
import {ConfigApp, isProduction} from "../config/ConfigApp";

export const cookieSet = (
	res: Response,
	name: string,
	value: string,
	maxAgeMillis?: number
) => {
	let defaultMaxAge: number = ConfigApp.cookie.defaultMaxAgeMs;
	let defaultHttpOnly: boolean = ConfigApp.cookie.defaultHttpOnly;
	let defaultSecure: boolean = ConfigApp.cookie.defaultSecure;
	let defaultSameSite: 'strict' | 'lax' | 'none' = ConfigApp.cookie.defaultSameSite;
	let defaultPath: string = ConfigApp.cookie.defaultPath;
	let defaultDomain: string = ConfigApp.cookie.defaultDomain;

	const cookieOptions = {
		httpOnly: defaultHttpOnly || false,
		secure: defaultSecure || false,
		domain: defaultDomain || "",
		sameSite: defaultSameSite || "strict",
		path: defaultPath || "/",
		maxAge: maxAgeMillis || defaultMaxAge
	};
	res.cookie(name, value, cookieOptions);
};
