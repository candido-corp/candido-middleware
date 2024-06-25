import {NextFunction, Request, Response} from "express";
import printer from "../../utils/customPrinter";
import {StatusCodes} from "http-status-codes";
import {controllerMap, originalApiCall} from "./ControllerDefinition";
import {EnumControllerName} from "../../data/enums/EnumControllerName";
import {EnumControllerType} from "../../data/enums/EnumControllerType";

export const Controller = async (
	req: Request,
	res: Response,
	next: NextFunction,
	controllerName: EnumControllerName,
	controllerType: EnumControllerType
) => {
	printer.controller(controllerName + " [{}] called with body: {}", EnumControllerType[controllerType], req.body);

	const controllerFunction = controllerMap[controllerName];

	if (!controllerFunction) {
		res.status(StatusCodes.FORBIDDEN).send();
		return;
	}

	try {
		let response = await controllerFunction(req, res, next, originalApiCall);
		res.status(response.status).send(response.data);
	} catch (error: any) {
		error.originalApiCall = (req: any, res: any) => controllerFunction(req, res, next, originalApiCall);
		next(error);
	}
};