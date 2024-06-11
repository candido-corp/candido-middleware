import { AxiosResponse } from "axios";
import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstance from "../../../config/ConfigAxios";
import {RequestRegisterVerifyByCodeData} from "../../../models/requests/RequestRegisterVerifyByCodeData";
import {RequestRegisterVerifyByEmailData} from "../../../models/requests/RequestRegisterVerifyByEmailData";

export async function API_V1_register_verify_by_email(
	{ token }: RequestRegisterVerifyByEmailData
): Promise<AxiosResponse> {
	return await axiosInstance.post(
		EnumServerRoutes.REGISTER_EMAIL_VERIFY + "/" + token
	);
}

export async function API_V1_register_verify_by_code(
	{ session_id , temporary_code }: RequestRegisterVerifyByCodeData
): Promise<AxiosResponse> {
	return await axiosInstance.post(
		EnumServerRoutes.REGISTER_CODE_VERIFY + "/" + session_id, {
			temporary_code
		}
	);
}