import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import {CustomAxiosConfig} from "../../../models/interfaces/CustomAxiosConfig";

export async function API_V1_account(
  axiosConfig?: CustomAxiosConfig
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.get(EnumServerRoutes.ACCOUNT, axiosConfig);
}
