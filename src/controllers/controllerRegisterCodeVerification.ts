import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {printerController} from "../utils/customPrinter";
import RegisterCodeBasedService from "../service/auth/register/code/RegisterCodeBasedService";

export const controllerRegisterCodeVerification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printerController("ControllerRegisterCodeVerification")
	try {
		let response = await new RegisterCodeBasedService().register(req);
		res.status(StatusCodes.OK).send({
			session_id: response.data.session_id
		});
	} catch (error) {
		next(error);
	}
};
