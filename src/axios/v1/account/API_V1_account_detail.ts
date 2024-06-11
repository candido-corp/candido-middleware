import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstance from "../../../config/ConfigAxios";
import { AxiosResponse } from "axios";
import { CustomAxiosConfig } from "../../../models/interfaces/CustomAxiosConfig";

export async function API_V1_account_detail(
	axiosConfig?: CustomAxiosConfig
): Promise<AxiosResponse> {
	return await axiosInstance.get(EnumServerRoutes.ACCOUNT_DETAILS, axiosConfig);
}
