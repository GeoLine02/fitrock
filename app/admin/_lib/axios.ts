import axios from "axios";

const isServer = typeof window === "undefined";
const isProduction = process.env.NODE_ENV === "production";

const baseURL = isServer
  ? isProduction
    ? process.env.NEXT_PUBLIC_ADMIN_API_URL
    : "http://localhost:4001"
  : "/admin-api";

const adminApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default adminApi;
