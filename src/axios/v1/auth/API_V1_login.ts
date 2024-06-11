import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstance from "../../../config/ConfigAxios";
import { AxiosResponse } from "axios";

export async function API_V1_login(
	email: string,
	password: string
): Promise<AxiosResponse> {
	return await axiosInstance.post(EnumServerRoutes.LOGIN, {
		email,
		password,
	});
}
