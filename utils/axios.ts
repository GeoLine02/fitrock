import axios from "axios";

const isServer = typeof window === "undefined";
const isProduction = process.env.NODE_ENV === "production";

// change http://localhost:4000 to PROD_API_URL

const baseURL = isServer
  ? isProduction
    ? process.env.PROD_API_URL // absolute for production SSR
    : "http://localhost:4000" // absolute for dev SSR (Next proxy)
  : "/api"; // browser will handle relative URL

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;

axios.defaults.withCredentials = true;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Prevent infinite loop
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 1️⃣ Refresh token
        await api.post("/auth/refresh-token", {}, { withCredentials: true });

        // 2️⃣ Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
