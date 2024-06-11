import { Request } from "express";

export const cookieGet = (
	req: Request,
	cookieName: string
): string | undefined => {
	return req.cookies[cookieName];
};
