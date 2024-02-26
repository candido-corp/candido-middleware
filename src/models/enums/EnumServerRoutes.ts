export enum EnumServerRoutes {
  API_V1 = "/api/v1",
  LOGIN = API_V1 + "/auth/authenticate",
  REGISTER_EMAIL_VERIFICATION = API_V1 + "/auth/register/email-verification",
  REGISTER_CODE_VERIFICATION = API_V1 + "/auth/register/code-verification",
  REGISTER_VERIFY_BY_EMAIL = API_V1 + "/auth/register-verify",
  REGISTER_VERIFY_BY_CODE = API_V1 + "/auth/register-verify/session",
  LOGOUT = API_V1 + "/auth/logout",
  REFRESH_TOKEN = API_V1 + "/auth/refresh-token",
  ACCOUNT = API_V1 + "/me",
}
