import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import {RegisterEmailBasedServiceInterface} from "./RegisterEmailBasedServiceInterface";
import {RequestRegisterData} from "../../../../models/requests/RequestRegisterData";
import {createError} from "../../../../utils/createError";
import {StatusCodes} from "http-status-codes";
import {API_V1_register_email_verification} from "../../../../axios/v1/auth/API_V1_register_email_verification";
import {RequestRegisterVerifyByEmailData} from "../../../../models/requests/RequestRegisterVerifyByEmailData";
import {API_V1_register_verify_by_email} from "../../../../axios/v1/auth/API_V1_register_verify_by_email";

/**
 * This class is used to implement the RegisterEmailBasedServiceInterface.
 * It provides methods to register a new user with email verification.
 */
export default class RegisterEmailBasedService implements RegisterEmailBasedServiceInterface {

    /**
     * This method is used to register a new user with email verification.
     * It first checks if all required fields are present in the request body.
     * If any required field is missing, it throws an error with status code 400.
     * If all required fields are present, it calls the API_V1_register_email_verification function with the provided data.
     *
     * @param {Request} req - The Express Request object.
     * @param {Response} res - The Express Response object.
     * @returns {Promise<AxiosResponse>} - Returns a promise that resolves to an AxiosResponse object.
     * @throws {Error} - Throws an error if any required field is missing in the request body.
     */
    public async register(req: Request, res: Response): Promise<AxiosResponse> {
        const { email, password, confirm_password, first_name, last_name }: RequestRegisterData = req.body;

        if (!email || !password || !confirm_password || !first_name || !last_name) {
            throw createError(
                StatusCodes.BAD_REQUEST,
                "Missing email or password or confirm_password or first_name or last_name"
            );
        }

        return await API_V1_register_email_verification(req.body);
    }

    /**
     * This method is used to verify a user by email.
     * It first checks if the token is present in the request parameters.
     * If the token is missing, it throws an error with status code 400.
     * If the token is present, it calls the API_V1_register_verify_by_email function with the provided token.
     *
     * @param {Request} req - The Express Request object.
     * @param {Response} res - The Express Response object.
     * @returns {Promise<AxiosResponse>} - Returns a promise that resolves to an AxiosResponse object.
     * @throws {Error} - Throws an error if the token is missing in the request parameters.
     */
    public async registerVerify(req: Request, res: Response): Promise<AxiosResponse> {
        const { token }: RequestRegisterVerifyByEmailData = req.params;
        if (!token) throw createError(StatusCodes.BAD_REQUEST, "Missing token");
        return await API_V1_register_verify_by_email(req.body);
    }

}