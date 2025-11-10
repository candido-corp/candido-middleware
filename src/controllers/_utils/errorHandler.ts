import {NextFunction, Request, Response} from "express";
import printer from "../../utils/customPrinter";
import {createError, isEnumErrorType, isSpringBootError} from "../../utils/createError";
import {EnumErrorType} from "../../data/enums/EnumErrorType";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (isSpringBootError(err)) {
		printer.error("Error Handler -> [{}]", err.message);
		res.status(err.status).send(err);
	} else {
		printer.error("Error Handler -> [{}]", err.message);
		let status = 'status' in err ? (err as { status: number }).status : 500;
		res.status(status).send({
			...createError({
				type: EnumErrorType.ERROR_APP,
				status: status,
				message: err.message
			}),
			...(isEnumErrorType(err.message) ? null : {dev_message: err.message})
		});
	}
};