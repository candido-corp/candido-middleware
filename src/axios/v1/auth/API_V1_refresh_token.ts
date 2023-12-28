import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";
import { AxiosResponse } from "axios";

export async function API_V1_refresh_token(
  refresh_token: string
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.post(EnumServerRoutes.REFRESH_TOKEN, {
    headers: {
      "Authorization": `Bearer ${refresh_token}`,
    },
  });
}
