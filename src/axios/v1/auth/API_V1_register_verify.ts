import { AxiosResponse } from "axios";
import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";

export async function API_V1_register_verify(
  token: string
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.get(
    EnumServerRoutes.REGISTER_VERIFY + "/" + token
  );
}
