import axios, { AxiosInstance } from "axios";
import { StatusCodes } from "http-status-codes";
import { API_V1_refresh_token } from "./auth/API_V1_refresh_token";

const axiosInstanceApiV1: AxiosInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
});

let accessToken: string = "";

export const setAccessToken = (newAccessToken: string): void => {
  accessToken = newAccessToken;
};

axiosInstanceApiV1.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceApiV1.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      // Lo status dell'errore
      console.log("Status errore:", error.response.status);

      // Puoi accedere ai dati dell'errore
      console.log("Dati errore:", error.response.data);

      if (error.response.status === StatusCodes.UNAUTHORIZED) {
        // const axiosResponse: AxiosResponse = await API_V1_refresh_token();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstanceApiV1;
