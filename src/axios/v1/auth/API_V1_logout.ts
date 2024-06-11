import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstance from "../../../config/ConfigAxios";
import { AxiosResponse } from "axios";
import { CustomAxiosConfig } from "../../../models/interfaces/CustomAxiosConfig";

export async function API_V1_logout(
  axiosConfig?: CustomAxiosConfig
): Promise<AxiosResponse> {
  return await axiosInstance.post(EnumServerRoutes.LOGOUT, axiosConfig);
}
