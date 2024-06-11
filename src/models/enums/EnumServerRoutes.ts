export enum EnumServerRoutes {
	API_V1 = "/api/v1",

	LOGIN = API_V1 + "/auth/login",
	LOGOUT = API_V1 + "/auth/logout",
	REFRESH_TOKEN = API_V1 + "/auth/token/refresh",

	REGISTER_EMAIL = API_V1 + "/auth/register/email",
	REGISTER_EMAIL_VERIFY = API_V1 + "/auth/register/email/verify",

	REGISTER_CODE = API_V1 + "/auth/register/code",
	REGISTER_CODE_VERIFY = API_V1 + "/auth/register/code/verify",
	REGISTER_CODE_RESEND = API_V1 + "/auth/register/code/resend",

	ACCOUNT = API_V1 + "/me",
	ACCOUNT_DETAILS = API_V1 + "/me/details",
}
