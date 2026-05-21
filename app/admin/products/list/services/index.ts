import { cookies } from "next/headers";

import adminApi from "@/app/admin/_lib/axios";

export const getProductsService = async (page: number, limit: number) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const res = await adminApi.get(`/products?page=${page}&limit=${limit}`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
