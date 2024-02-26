import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";
import { AxiosResponse } from "axios";

export async function API_V1_register_email_verification(
  email: string,
  password: string,
  confirm_password: string,
  first_name: string,
  last_name: string
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.post(EnumServerRoutes.REGISTER_EMAIL_VERIFICATION, {
    email,
    password,
    confirm_password,
    first_name,
    last_name
  });
}

export async function API_V1_register_code_verification(
    email: string,
    password: string,
    confirm_password: string,
    first_name: string,
    last_name: string
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.post(EnumServerRoutes.REGISTER_CODE_VERIFICATION, {
    email,
    password,
    confirm_password,
    first_name,
    last_name
  });
}
