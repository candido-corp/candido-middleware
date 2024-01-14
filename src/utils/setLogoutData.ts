import { Response } from "express";
import { cookieDelete } from "./cookieDelete";
import { EnumAuthCookies } from "../models/enums/EnumAuthCookies";
import { printer } from "./printer";

export const setLogoutData = (res: Response) => {
  printer("App::Logout");
  cookieDelete(res, EnumAuthCookies.ACCESS_TOKEN);
  cookieDelete(res, EnumAuthCookies.REFRESH_TOKEN);
};
