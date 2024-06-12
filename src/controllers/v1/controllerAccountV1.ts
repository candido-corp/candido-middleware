import {NextFunction, Request, Response} from "express";
import {AxiosResponse} from "axios";
import printer from "../../utils/customPrinter";
import NetworkClient from "../../data/NetworkClient";
import {CustomAxiosConfig} from "../../config/ConfigAxios";

export const controllerAccountV1 = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printer.controller(controllerAccountV1.name + " called");

	const originalApiCall = async (axiosConfig?: CustomAxiosConfig): Promise<AxiosResponse> => {
		return await NetworkClient.getAccount({axiosConfig: axiosConfig});
	};

	try {
		const axiosResponse: AxiosResponse = await originalApiCall(req.axiosConfig);
		res.status(axiosResponse.status).send(axiosResponse.data);
	} catch (error: any) {
		error.originalApiCall = originalApiCall;
		next(error);
	}
};
