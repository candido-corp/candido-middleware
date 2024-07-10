import {Response} from "express";
import {ConfigApp} from "../config/ConfigApp";

export const cookieDelete = (res: Response, cookieName: string) => {
	let defaultHttpOnly: boolean = ConfigApp.cookie.defaultHttpOnly;
	let defaultSecure: boolean = ConfigApp.cookie.defaultSecure;
	let defaultSameSite: 'strict' | 'lax' | 'none' = ConfigApp.cookie.defaultSameSite;
	let defaultPath: string = ConfigApp.cookie.defaultPath;
	let defaultDomain: string = ConfigApp.cookie.defaultDomain;

	const cookieOptions = {
		expires: new Date(0),
		httpOnly: defaultHttpOnly || false,
		secure: defaultSecure || false,
		domain: defaultDomain || "",
		sameSite: defaultSameSite || "strict",
		path: defaultPath || "/"
	};
	res.cookie(cookieName, null, cookieOptions);
};
