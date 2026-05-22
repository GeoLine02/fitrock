import axios from "axios";

const isServer = typeof window === "undefined";
const isProduction = process.env.NODE_ENV === "production";

const baseURL = isServer
  ? `${isProduction ? process.env.NEXT_PUBLIC_URL : "http://localhost:3000"}/api`
  : "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
