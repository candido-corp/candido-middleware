import { NextFunction, Request, Response } from "express";
import { AxiosResponse } from "axios";
import { setLogoutData } from "../utils/setLogoutData";
import AuthService from "../service/auth/AuthService";
import { printerController } from "../utils/customPrinter";
import NetworkClient from "../data/NetworkClient";
import {StatusCodes} from "http-status-codes";

export const controllerLogout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printerController("controllerLogout called with body: {}", req.body);

	try {
		await NetworkClient.logout();
		setLogoutData(res);
		res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		next(error);
	}
};
