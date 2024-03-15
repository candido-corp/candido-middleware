import { Response } from "express";

export const cookieDelete = (res: Response, cookieName: string) => {
  res.cookie(cookieName, "", {
    expires: new Date(0),
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });
};
