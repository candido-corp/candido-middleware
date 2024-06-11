import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import printer from "../utils/customPrinter";
import NetworkClient from "../data/NetworkClient";

export const controllerRegisterEmailVerification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printer.controller("controllerRegisterEmailVerification called with body: {}", req.body);

	try {
		await NetworkClient.register({ data: req.body });
		res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		next(error);
	}
};
