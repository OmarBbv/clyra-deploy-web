import axios from "axios";
import { getCookie } from "typescript-cookie";

const base_url = "http://localhost:9000/api";

const BASE_API = axios.create({
  baseURL: base_url,
});

axios.defaults.withCredentials = true;

BASE_API.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default BASE_API;
