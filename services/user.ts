import api from "@/utils/axios";

export const getUser = async () => {
  try {
    return await api.get("/users/me");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null; // Not logged in → normal case
    }
    throw error; // real error
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
