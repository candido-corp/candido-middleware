import { NextFunction, Request, Response } from "express";
import {AxiosResponse} from "axios";
import { CustomAxiosConfig } from "../models/interfaces/CustomAxiosConfig";
import printer from "../utils/customPrinter";
import NetworkClient from "../data/NetworkClient";

export const controllerAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printer.controller("controllerAccount called");

	const originalApiCall = async (axiosConfig?: CustomAxiosConfig): Promise<AxiosResponse> => {
		return await NetworkClient.getAccount({ axiosConfig: axiosConfig });
	};

	try {
		const axiosResponse: AxiosResponse = await originalApiCall(req.axiosConfig);
		res.status(axiosResponse.status).send(axiosResponse.data);
	} catch (error: any) {
		error.originalApiCall = originalApiCall;
		next(error);
	}
};
