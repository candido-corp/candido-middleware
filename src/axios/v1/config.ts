import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import dotenv from "dotenv";
import {printer} from "../../utils/printer";

dotenv.config();

const axiosInstanceApiV1: AxiosInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstanceApiV1.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    printer('App::call::config -> [{}{}]', config.baseURL, config.url)
    const token = config.headers.accessToken || config.headers.refreshToken;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceApiV1.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    printer('App::call::response -> [{}]', response.status)
    return response;
  },
  async (error) => {
    printer('App::call::response -> [{}]', error.response.status)
    return Promise.reject(error);
  }
);

export default axiosInstanceApiV1;
