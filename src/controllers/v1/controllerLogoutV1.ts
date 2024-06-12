import {NextFunction, Request, Response} from "express";
import {setLogoutData} from "../../utils/setLogoutData";
import {printerController} from "../../utils/customPrinter";
import NetworkClient from "../../data/NetworkClient";
import {StatusCodes} from "http-status-codes";

export const controllerLogoutV1 = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printerController(controllerLogoutV1.name + " called with body: {}", req.body);

	try {
		await NetworkClient.logout();
		setLogoutData(res);
		res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		next(error);
	}
};
