import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import printer from "../../utils/customPrinter";
import NetworkClient from "../../data/NetworkClient";

export const controllerRegisterCodeV1 = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printer.controller(controllerRegisterCodeV1.name + " called with body: {}", req.body);

	try {
		let response = await NetworkClient.registerCode({data: req.body});
		res.status(StatusCodes.OK).send({t: response.data.t});
	} catch (error) {
		next(error);
	}
};
