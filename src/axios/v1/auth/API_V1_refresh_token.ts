import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";
import { AxiosResponse } from "axios";
import { CustomAxiosConfig } from "../../../models/interfaces/CustomAxiosConfig";

export async function API_V1_refresh_token(
  axiosConfig?: CustomAxiosConfig
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.post(
    EnumServerRoutes.REFRESH_TOKEN,
    {},
    axiosConfig
  );
}
