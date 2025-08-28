import axios from "axios";
import { BASE_URL_LOCAL } from "../src/utils/constants";

const axiosConfig = axios.create({
  baseURL: BASE_URL_LOCAL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosConfig.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosConfig