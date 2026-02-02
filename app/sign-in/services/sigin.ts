import api from "@/utils/axios";
import axios from "axios";

interface SignInPayload {
  email: string;
  password: string;
}

interface SignInResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      full_name: string;
      email: string;
      phone_number: string | null;
    };
  };
}

export async function signIn(payload: SignInPayload) {
  try {
    const response = await api.post<SignInResponse>("/auth/login", payload);

    return response.data;
  } catch (error) {
    // Axios-specific error handling
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      // Invalid credentials
      if (status === 401) {
        throw new Error(message || "Invalid email or password");
      }

      // Backend returned error message
      if (message) {
        throw new Error(message);
      }
    }

    // Fallback
    throw new Error("Something went wrong. Please try again later.");
  }
}
