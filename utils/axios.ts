import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

const api = axios.create({
  baseURL: isProduction ? "/api" : "http://localhost:3000/api",
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
