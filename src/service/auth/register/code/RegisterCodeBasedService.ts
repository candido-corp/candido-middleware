import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import {RegisterCodeBasedServiceInterface} from "./RegisterCodeBasedServiceInterface";
import {
	API_V1_register_code_verification
} from "../../../../axios/v1/auth/API_V1_register_email_verification";
import {
	API_V1_register_verify_by_code,
	API_V1_register_verify_by_email
} from "../../../../axios/v1/auth/API_V1_register_verify_by_email";

export default class RegisterCodeBasedService implements RegisterCodeBasedServiceInterface {

	public async register(req: Request): Promise<AxiosResponse> {
		return await API_V1_register_code_verification(req.body);
    }

	public async registerVerify(req: Request, res: Response): Promise<AxiosResponse> {
		return await API_V1_register_verify_by_code(req.body);
    }

	public async registerResendCode(req: Request, res: Response): Promise<AxiosResponse> {
		return await API_V1_register_verify_by_email(req.body);
	}
}