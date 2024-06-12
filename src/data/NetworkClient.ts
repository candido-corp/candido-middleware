import {GET, POST} from './NetworkCallDecorator';
import {EnumServerRoutes} from "./enums/EnumServerRoutes";
import {ResponseLoginData} from "./responses/ResponseLoginData";
import {RequestLogin} from "./requests/RequestLogin";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {RequestRegister} from "./requests/RequestRegister";
import {RequestRegisterEmailVerify} from "./requests/RequestRegisterEmailVerify";
import {RequestRegisterCodeResend} from "./requests/RequestRegisterCodeResend";
import {RequestRegisterCodeVerify} from "./requests/RequestRegisterCodeVerify";
import {ResponseRegisterCode} from "./responses/ResponseRegisterCode";
import {RequestResetPasswordSend} from "./requests/RequestResetPasswordSend";

class NetworkClient {

	@POST(EnumServerRoutes.LOGIN)
	async login(options: { data: RequestLogin }): Promise<AxiosResponse<ResponseLoginData>> {
		return {} as AxiosResponse<ResponseLoginData>;
	}

	@POST(EnumServerRoutes.LOGOUT)
	async logout(): Promise<AxiosResponse> {
		return {} as AxiosResponse;
	}

	@POST(EnumServerRoutes.REFRESH_TOKEN)
	async refreshToken(): Promise<AxiosResponse<ResponseLoginData>> {
		return {} as AxiosResponse<ResponseLoginData>;
	}

	@POST(EnumServerRoutes.REGISTER_EMAIL)
	async registerEmail(options: { data: RequestRegister }): Promise<AxiosResponse> {
		return {} as AxiosResponse;
	}

	@POST(EnumServerRoutes.REGISTER_EMAIL_VERIFY)
	async registerEmailVerify(options: { data: RequestRegisterEmailVerify }): Promise<AxiosResponse> {
		return {} as AxiosResponse;
	}

	@POST(EnumServerRoutes.REGISTER_CODE)
	async registerCode(options: { data: RequestRegister }): Promise<AxiosResponse<ResponseRegisterCode>> {
		return {} as AxiosResponse<ResponseRegisterCode>;
	}

	@POST(EnumServerRoutes.REGISTER_CODE_RESEND)
	async registerCodeResend(options: { data: RequestRegisterCodeResend }): Promise<AxiosResponse> {
		return {} as AxiosResponse;
	}

	@POST(EnumServerRoutes.REGISTER_CODE_VERIFY)
	async registerCodeVerify(options: { data: RequestRegisterCodeVerify }): Promise<AxiosResponse> {
		return {} as AxiosResponse;
	}

	@POST(EnumServerRoutes.RESET_PASSWORD_SEND)
	async resetPasswordSend(options: { data: RequestResetPasswordSend }): Promise<AxiosResponse> {
		return {} as AxiosResponse;
	}

	@POST(EnumServerRoutes.RESET_PASSWORD_CHANGE_PASSWORD)
	async resetPasswordChangePassword(options: { data: RequestResetPasswordSend }): Promise<AxiosResponse> {
		return {} as AxiosResponse;
	}

	@GET(EnumServerRoutes.ACCOUNT)
	async getAccount(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
		return {} as AxiosResponse;
	}

	@GET(EnumServerRoutes.ACCOUNT_DETAILS)
	async getAccountDetails(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> {
		return {} as AxiosResponse;
	}

}

export default new NetworkClient();
