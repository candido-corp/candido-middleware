import {CallResponseType} from "../../controllers/v1/ControllerDefinition";

export interface CustomError {
	code: string;
	data?: object;
	message?: string;
}

export interface CustomErrorResponse extends Error {
	status: number;
	timestamp: string;
	errors: CustomError[];
	originalApiCall?: (req: any, res: any) => Promise<CallResponseType>;
}