import {NextFunction, Request, Response} from "express";
import {CustomErrorResponse} from "../../data/utils/CustomErrorResponse";
import printer from "../../utils/customPrinter";

export const errorHandler = (
	err: CustomErrorResponse,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	printer.error("Error Handler -> [{}]", err.message);
	res.status(err.status).send(err);
};
