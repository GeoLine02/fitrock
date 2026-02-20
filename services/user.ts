import api from "@/utils/axios";

export const getUser = async () => {
  try {
    const response = await api.get(`/users/me`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export async function logOut() {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
