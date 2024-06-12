import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import printer from "../../utils/customPrinter";
import NetworkClient from "../../data/NetworkClient";

export const controllerRegisterEmailV1 = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printer.controller(controllerRegisterEmailV1.name + " called with body: {}", req.body);

	try {
		await NetworkClient.registerEmail({data: req.body});
		res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		next(error);
	}
};
