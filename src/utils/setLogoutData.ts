import { Response } from "express";
import { cookieDelete } from "./cookieDelete";
import { EnumAuthCookies } from "../models/enums/EnumAuthCookies";
import printer from "./customPrinter";

export const setLogoutData = (res: Response) => {
	printer.info("Logout successful.");
	cookieDelete(res, EnumAuthCookies.ACCESS_TOKEN);
	cookieDelete(res, EnumAuthCookies.REFRESH_TOKEN);
};
