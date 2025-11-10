import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig,} from "axios";
import dotenv from "dotenv";
import printer from "../utils/customPrinter";
import {ConfigApp} from "./ConfigApp";

dotenv.config();

export interface CustomAxiosConfig {
	headers?: {
		accessToken?: string;
		refreshToken?: string;
		[key: string]: string | undefined;
	};
}

const axiosInstance: AxiosInstance = axios.create({
	baseURL: ConfigApp.springBootServerBaseUrl,
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
		return response;
	},
	async (error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
