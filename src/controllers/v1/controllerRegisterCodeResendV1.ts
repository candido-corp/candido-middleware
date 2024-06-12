import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import printer from "../../utils/customPrinter";
import NetworkClient from "../../data/NetworkClient";

export const controllerRegisterCodeResendV1 = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printer.controller(controllerRegisterCodeResendV1.name + " called with body: {}", req.body);

	try {
		await NetworkClient.registerCodeResend({data: req.body});
		res.status(StatusCodes.NO_CONTENT).send({});
	} catch (error) {
		next(error);
	}
};
