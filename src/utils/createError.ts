import {CustomError, CustomErrorResponse} from "../data/utils/CustomErrorResponse";
import {EnumErrorType} from "../data/enums/EnumErrorType";

interface ErrorConfig {
	type: string;
	status?: number;
	message?: string;
	timestamp?: string;
	errors?: CustomError[];
}

export function createError(errorConfig: ErrorConfig): CustomErrorResponse {
	const {
		type = EnumErrorType.ERROR_APP,
		status = 500,
		timestamp = new Date().toISOString(),
		errors
	} = errorConfig;

	const error = new Error(type) as CustomErrorResponse;
	error.status = status;
	error.timestamp = timestamp;
	if(errors) error.errors = errors;
	return error;
}

export function isSpringBootError(error: any): error is CustomErrorResponse {
	return (
		error &&
		typeof error === 'object' &&
		'status' in error &&
		'timestamp' in error &&
		'errors' in error &&
		Array.isArray(error.errors)
	);
}
