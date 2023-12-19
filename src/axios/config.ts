import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  //TODO get token from cookie here
  config.headers.Authorization = `Bearer ${token.access_token}`;
  return config;
});

export default axiosInstance;
