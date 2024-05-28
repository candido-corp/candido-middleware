import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import {RegisterCodeBasedServiceInterface} from "./RegisterCodeBasedServiceInterface";
import {RequestRegisterData} from "../../../../models/requests/RequestRegisterData";
import {createError} from "../../../../utils/createError";
import {StatusCodes} from "http-status-codes";
import {
	API_V1_register_code_verification
} from "../../../../axios/v1/auth/API_V1_register_email_verification";
import {RequestRegisterVerifyByEmailData} from "../../../../models/requests/RequestRegisterVerifyByEmailData";
import {
	API_V1_register_verify_by_code,
	API_V1_register_verify_by_email
} from "../../../../axios/v1/auth/API_V1_register_verify_by_email";
import {RequestRegisterVerifyByCodeData} from "../../../../models/requests/RequestRegisterVerifyByCodeData";

export default class RegisterCodeBasedService implements RegisterCodeBasedServiceInterface {


	public async register(req: Request, res: Response): Promise<AxiosResponse> {
		const { email, password, confirm_password, first_name, last_name }: RequestRegisterData = req.body;

		if (!email || !password || !confirm_password || !first_name || !last_name) {
			throw createError(
				StatusCodes.BAD_REQUEST,
				"Missing email or password or confirm_password or first_name or last_name"
			);
		}

		return await API_V1_register_code_verification(email, password, confirm_password, first_name, last_name);
    }


	public async registerVerify(req: Request, res: Response): Promise<AxiosResponse> {
		const { session_id, temporary_code }: RequestRegisterVerifyByCodeData = req.params;

		if (!session_id || !temporary_code) {
			throw createError(StatusCodes.BAD_REQUEST, "Missing session_id or temporary_code");
		}

		return await API_V1_register_verify_by_code(session_id, temporary_code);
    }


	public async registerResendCode(req: Request, res: Response): Promise<AxiosResponse> {
		const { token }: RequestRegisterVerifyByEmailData = req.params;
		if (!token) throw createError(StatusCodes.BAD_REQUEST, "Missing token");
		return await API_V1_register_verify_by_email(token);
	}
}