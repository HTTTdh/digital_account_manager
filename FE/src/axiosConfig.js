import axios from "axios";
import { BASE_URL_LOCAL } from "../src/utils/constants";

export const axiosConfig = axios.create({
  baseURL: BASE_URL_LOCAL,
  withCredentials: true,
});
