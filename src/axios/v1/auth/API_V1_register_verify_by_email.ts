import { AxiosResponse } from "axios";
import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";

export async function API_V1_register_verify_by_email(
  token: string
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.post(
    EnumServerRoutes.REGISTER_VERIFY_BY_EMAIL + "/" + token
  );
}

export async function API_V1_register_verify_by_code(
    session_id: string,
    temporary_code: string
): Promise<AxiosResponse> {
  return await axiosInstanceApiV1.post(
      EnumServerRoutes.REGISTER_VERIFY_BY_CODE + "/" + session_id, {
        temporary_code
      }
  );
}