import {NextFunction, Request, Response} from "express";
import printer from "../../utils/customPrinter";
import NetworkClient from "../../data/NetworkClient";
import {StatusCodes} from "http-status-codes";

export const controllerResetPasswordSendV1 = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printer.controller(controllerResetPasswordSendV1.name + " called with body: {}", req.body);

	try {
		await NetworkClient.resetPasswordSend({data: req.body});
		res.status(StatusCodes.NO_CONTENT).send({});
	} catch (error) {
		next(error);
	}
};
