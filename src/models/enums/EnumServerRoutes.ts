export enum EnumServerRoutes {
  API_V1 = "/api/v1",
  LOGIN = API_V1 + "/auth/authenticate",
  REGISTER = API_V1 + "/auth/register",
  REGISTER_VERIFY = API_V1 + "/auth/register-verify",
  LOGOUT = API_V1 + "/auth/logout",
  REFRESH_TOKEN = API_V1 + "/auth/refresh-token",
  ACCOUNT = API_V1 + "/me",
}
