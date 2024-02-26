export enum EnumRoutes {
  API_V1 = "/api/v1",
  LOGIN = API_V1 + "/auth/login",
  REGISTER_EMAIL_VERIFICATION = API_V1 + "/auth/register/email-verification",
  REGISTER_CODE_VERIFICATION = API_V1 + "/auth/register/code-verification",
  REGISTER_VERIFY_BY_EMAIL = API_V1 + "/auth/register-verify/:token",
  REGISTER_VERIFY_BY_CODE = API_V1 + "/auth/register-verify/session/:sessionId",
  LOGOUT = API_V1 + "/auth/logout",
  ACCOUNT = API_V1 + "/account",
}
