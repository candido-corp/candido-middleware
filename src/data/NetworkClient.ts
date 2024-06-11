import {GET, POST} from '../decorators/NetworkCall';
import {EnumServerRoutes} from "../models/enums/EnumServerRoutes";
import {ResponseLoginData} from "../models/responses/ResponseLoginData";
import {RequestLoginData} from "../models/requests/RequestLoginData";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {RequestRegisterData} from "../models/requests/RequestRegisterData";

class NetworkClient {

	@POST(EnumServerRoutes.LOGIN)
	async login(options: { data: RequestLoginData }): Promise<AxiosResponse<ResponseLoginData>>  { return {} as AxiosResponse<ResponseLoginData>; }

	@POST(EnumServerRoutes.LOGOUT)
	async logout(): Promise<AxiosResponse> { return {} as AxiosResponse; }

	@POST(EnumServerRoutes.REFRESH_TOKEN)
	async refreshToken(): Promise<AxiosResponse<ResponseLoginData>> { return {} as AxiosResponse<ResponseLoginData>; }

	@POST(EnumServerRoutes.REGISTER_EMAIL)
	async register(options: { data: RequestRegisterData }): Promise<AxiosResponse> { return {} as AxiosResponse; }

	@GET(EnumServerRoutes.ACCOUNT)
	async getAccount(options: { axiosConfig?: AxiosRequestConfig }): Promise<AxiosResponse> { return {} as AxiosResponse; }

	@GET(EnumServerRoutes.ACCOUNT_DETAILS)
	async getAccountDetails(): Promise<AxiosResponse> { return {} as AxiosResponse; }

}

export default new NetworkClient();
