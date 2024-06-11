import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstance from "../../../config/ConfigAxios";
import { AxiosResponse } from "axios";
import {RequestRegisterData} from "../../../models/requests/RequestRegisterData";

export async function API_V1_register_email_verification(
	{ email, password, confirm_password, first_name, last_name }: RequestRegisterData
): Promise<AxiosResponse>
{
	return await axiosInstance.post(EnumServerRoutes.REGISTER_EMAIL, {
		email,
		password,
		confirm_password,
		first_name,
		last_name
	});
}

export async function API_V1_register_code_verification(
	{ email, password, confirm_password, first_name, last_name }: RequestRegisterData
): Promise<AxiosResponse>
{
	return await axiosInstance.post(EnumServerRoutes.REGISTER_CODE, {
		email,
		password,
		confirm_password,
		first_name,
		last_name
	});
}
