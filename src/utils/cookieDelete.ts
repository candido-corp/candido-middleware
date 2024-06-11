import { Response } from "express";
import {isProduction} from "../config/ConfigApp";

export const cookieDelete = (res: Response, cookieName: string) => {
	res.cookie(cookieName, "", {
		expires: new Date(0),
		path: "/",
		httpOnly: false,
		secure: isProduction,
	});
};
