import {NextFunction, Request, Response} from "express";
import printer from "../../utils/customPrinter";
import {CustomAxiosConfig} from "../../config/ConfigAxios";
import {AxiosResponse} from "axios";
import {StatusCodes} from "http-status-codes";
import NetworkClient from "../../data/NetworkClient";
import {controllerMap} from "./ControllerDefinition";
import {EnumControllerName} from "../../data/enums/EnumControllerName";
import {EnumControllerType, isControllerPublic} from "../../data/enums/EnumControllerType";

export const Controller = async (
	req: Request,
	res: Response,
	next: NextFunction,
	controllerName: EnumControllerName,
	controllerType: EnumControllerType
) => {
	printer.controller(controllerName + " called with body: {}", req.body);

	const originalApiCall = async (axiosConfig?: CustomAxiosConfig, func?: Function): Promise<AxiosResponse> => {
		return await func?.bind(NetworkClient)({
			...(axiosConfig && {axiosConfig: axiosConfig}),
			...(req.body && {data: req.body}),
			...(req.params && {params: req.params}),
		});
	};

	const controllerFunction = controllerMap[controllerName];

	if (!controllerFunction) {
		res.status(StatusCodes.FORBIDDEN).send();
		return;
	}

	try {
		await controllerFunction(req, res, next, originalApiCall);
	} catch (error: any) {
		error.originalApiCall = (axiosConfig: {}) => originalApiCall(axiosConfig, controllerFunction);
		next(error);
	}
};