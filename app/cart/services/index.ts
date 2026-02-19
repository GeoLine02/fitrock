import api from "@/utils/axios";
import { cookies } from "next/headers";

export async function getCartItems() {
  try {
    const cookieStore = await cookies();

    const acceskToken = cookieStore.get("accessToken")?.value;

    const res = await api.get(`/cart`, {
      headers: {
        Cookie: `accessToken=${acceskToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
