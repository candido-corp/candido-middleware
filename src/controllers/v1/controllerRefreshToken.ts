import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {AxiosResponse} from "axios";
import printer from "../../utils/customPrinter";
import {setLoginData} from "../../utils/setLoginData";
import {setLogoutData} from "../../utils/setLogoutData";
import NetworkClient from "../../data/NetworkClient";
import {ResponseLoginData} from "../../data/responses/ResponseLoginData";

export const controllerRefreshToken = async (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const status = err.response?.status;

	printer.controller(
		controllerRefreshToken.name + " called with body: {} | url: {} | status: {}",
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
