import api from "@/utils/axios";

export const getUser = async () => {
  try {
    const response = await api.get(`/users/me`);
    console.log("user Data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
