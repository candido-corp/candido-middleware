import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import dotenv from "dotenv";

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
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstanceApiV1;
