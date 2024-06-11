import axios, {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import dotenv from "dotenv";
import printer from "../utils/customPrinter";
import { ConfigApp } from "./ConfigApp";

dotenv.config();

const axiosInstance: AxiosInstance = axios.create({
	baseURL: ConfigApp.serverBaseUrl,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig<any>) => {
		printer.axios('Configuration URL -> [{}{}]', config.baseURL, config.url)
		const token = config.headers.accessToken || config.headers.refreshToken;
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response: AxiosResponse<any, any>) => {
		printer.axios('Response STATUS -> [{}]', response.status)
		return response;
	},
	async (error) => {
		printer.axios('Response STATUS -> [{}]', error.response.status)
		return Promise.reject(error);
	}
);

export default axiosInstance;
