import axios from "axios";
import { isDemoToken } from "../utils/demoData";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8082",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cardmaster_token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("cardmaster_token");
    if (error.response?.status === 401 && !isDemoToken(token)) {
      localStorage.removeItem("cardmaster_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
