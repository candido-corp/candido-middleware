import {CustomAxiosConfig} from "../../config/ConfigAxios";
import {AxiosResponse} from "axios";

export interface CustomError {
	code: string;
	data?: object;
	message?: string;
}

export interface CustomErrorResponse extends Error {
	status: number;
	timestamp: string;
	errors: CustomError[];
	originalApiCall?: (axiosConfig?: CustomAxiosConfig) => Promise<AxiosResponse>;
}