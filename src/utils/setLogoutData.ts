import {Response} from "express";
import {cookieDelete} from "./cookieDelete";
import {EnumAuthCookies} from "../data/enums/EnumAuthCookies";
import printer from "./customPrinter";

export const setLogoutData = (res: Response) => {
	cookieDelete(res, EnumAuthCookies.ACCESS_TOKEN);
	cookieDelete(res, EnumAuthCookies.REFRESH_TOKEN);
	printer.info("Logout data set");
};
