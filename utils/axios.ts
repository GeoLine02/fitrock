import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Extend AxiosRequestConfig for _retry
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const AUTH_EXCLUDED_ROUTES = ["/auth/login", "/auth/refresh"];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (err: any) => void;
  config: AxiosRequestConfig;
}[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const url = originalRequest.url || "";

    // 🚫 Do NOT refresh for login or refresh endpoints
    if (
      status === 401 &&
      !originalRequest._retry &&
      !AUTH_EXCLUDED_ROUTES.some((route) => url.includes(route))
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
