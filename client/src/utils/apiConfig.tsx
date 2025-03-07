import axios from 'axios';
import { getCookie } from 'typescript-cookie';

const base_url = 'https://clyra-api.onrender.com/api';
// const base_url = 'https://localhost:5000/api';
const BASE_API = axios.create({
  baseURL: base_url,
  timeout: 5000,
});

axios.defaults.withCredentials = true;

BASE_API.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default BASE_API;
