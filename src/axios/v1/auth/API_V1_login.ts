import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";
import { AxiosResponse } from "axios";

export async function API_V1_login(
  email: string,
  password: string
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.post(EnumServerRoutes.LOGIN, {
    email: email,
    password: password,
  });
}
