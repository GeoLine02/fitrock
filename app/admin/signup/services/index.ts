import adminApi from "@/app/admin/_lib/axios";
import { SignUpCreds } from "../types";

export const signupService = async (data: SignUpCreds) => {
  try {
    const res = await adminApi.post("/auth/signup", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
