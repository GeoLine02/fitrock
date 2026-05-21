import adminApi from "@/app/admin/_lib/axios";
import { SignInCreds } from "../types";

export const signinService = async (data: SignInCreds) => {
  try {
    const res = await adminApi.post("/auth/signin", data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
