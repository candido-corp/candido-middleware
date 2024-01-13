export enum EnumRoutes {
  API_V1 = "/api/v1",
  LOGIN = API_V1 + "/auth/login",
  REGISTER = API_V1 + "/auth/register",
  REGISTER_VERIFY = API_V1 + "/auth/register-verify/:token",
  LOGOUT = API_V1 + "/auth/logout",
  ACCOUNT = API_V1 + "/account",
}
