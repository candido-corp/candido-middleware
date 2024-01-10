import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";
import { AxiosResponse } from "axios";

export async function API_V1_register(
  email: string,
  password: string,
  confirm_password: string
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.post(EnumServerRoutes.REGISTER, {
    email,
    password,
    confirm_password,
  });
}
