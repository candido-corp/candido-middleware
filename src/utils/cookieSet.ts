import { Response } from "express";

export const cookieSet = (
  res: Response,
  name: string,
  value: string,
  maxAgeMillis?: number
) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: maxAgeMillis || 3600000, // default 1 hour
  };

  res.cookie(name, value, cookieOptions);
};
