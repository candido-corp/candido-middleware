import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AxiosResponse } from "axios";
import printer from "../utils/customPrinter";
import AuthService from "../service/auth/AuthService";
import { setLoginData } from "../utils/setLoginData";
import { setLogoutData } from "../utils/setLogoutData";
import NetworkClient from "../data/NetworkClient";
import {ResponseLoginData} from "../models/responses/ResponseLoginData";

export const controllerRefreshToken = async (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const status = err.response?.status;

	printer.controller(
		"controllerRefreshToken called with body: {} | url: {} | status: {}",
		req.body,
		req.url,
		status
	);

	if (status === StatusCodes.UNAUTHORIZED) {
		printer.controller("controllerRefreshToken retry to call -> {}", req.url);

		try {
			const axiosResponse: AxiosResponse<ResponseLoginData> = await NetworkClient.refreshToken();
			setLoginData(req, res, axiosResponse.data);
			const retryAxiosResponse: AxiosResponse = await err.originalApiCall(req.axiosConfig);
			res.status(retryAxiosResponse.status).send(retryAxiosResponse.data);
			return;
		} catch (error) {
			setLogoutData(res);
			next(err);
		}
	}

	next(err);
};
