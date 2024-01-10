import { EnumServerRoutes } from "../../../models/enums/EnumServerRoutes";
import axiosInstanceApiV1 from "../config";

export async function API_V1_register_verify(token: string) {
  return await axiosInstanceApiV1.get(
    EnumServerRoutes.REGISTER_VERIFY + "/" + token
  );
}
