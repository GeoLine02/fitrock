import adminApi from "@/app/admin/_lib/axios";
import { cookies } from "next/headers";

export async function getFilters(page: number, limit: number) {
  try {
    const cookeiStore = await cookies();
    const accessToken = cookeiStore.get("accessToken")?.value;

    const res = await adminApi.get(`/filters?page=${page}&limit=${limit}`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFilter(filterId: number) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await adminApi.get(`/filters/${filterId}`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
