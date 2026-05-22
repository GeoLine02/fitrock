// services/auth.service.ts
import { User } from "@/types/user.type";
import api from "@/utils/axios";
import axios from "axios";

interface SignUpPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface SignUpResponse {
  success: boolean;
  data: {
    user: User;
  };
}

export const signup = async (payload: SignUpPayload) => {
  try {
    const response = await api.post<SignUpResponse>("/auth/register", payload);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      const message = data?.message;
      const fieldErrors = data?.errors as
        | { field: string; message: string }[]
        | undefined;

      if (message) {
        throw new Error(message);
      }

      if (fieldErrors?.length) {
        throw new Error(fieldErrors[0].message);
      }
    }

    throw new Error("Something went wrong. Please try again later.");
  }
};
