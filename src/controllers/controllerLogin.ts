import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { setLoginData } from "../utils/setLoginData";
import { printerController } from "../utils/customPrinter";
import NetworkClient from "../data/NetworkClient";
import {AxiosResponse} from "axios";
import {ResponseLoginData} from "../models/responses/ResponseLoginData";

export const controllerLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printerController("controllerLogin called with body: {}", req.body);

	try {
		const axiosResponse: AxiosResponse<ResponseLoginData> = await NetworkClient.login({ data: req.body });
		setLoginData(req, res, axiosResponse.data);
		res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		next(error);
	}
};
