import { setAccessToken } from "../axios/v1/config";
import { Request } from "express";
import { cookieGet } from "./cookieGet";
import { EnumAuthCookies } from "../models/enums/EnumAuthCookies";

export const updateAccessToken = (req: Request): void => {
  const accessToken = cookieGet(req, EnumAuthCookies.ACCESS_TOKEN);
  if (accessToken) {
    setAccessToken(accessToken);
  }
};
