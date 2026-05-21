import adminApi from "@/app/admin/_lib/axios";
import { cookies } from "next/headers";

export async function getUserCount() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await adminApi.get("/user/count", {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });
    return res.data.count;
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  }
}

export async function getProductsCount() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await adminApi.get("/products/count", {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });
    return res.data.count;
  } catch (error) {
    console.error("Error fetching products count:", error);
    throw error;
  }
}

export async function getLowInStockProducts() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const res = await adminApi.get("/products/low-in-stock", {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
