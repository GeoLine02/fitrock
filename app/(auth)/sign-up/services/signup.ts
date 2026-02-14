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
      const status = error.response?.status;
      const message = error.response?.data?.message;

      // Email already exists
      if (status === 400) {
        throw new Error(message || "Email already exists");
      }

      // Other backend error
      if (message) {
        throw new Error(message);
      }
    }

    throw new Error("Something went wrong. Please try again later.");
  }
};
