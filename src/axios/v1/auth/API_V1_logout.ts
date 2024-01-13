import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export async function API_V1_logout(
  axiosConfig?: AxiosRequestConfig
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.get(EnumServerRoutes.LOGOUT, axiosConfig);
}
