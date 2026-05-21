import { ProductData } from "@/app/admin/products/create/types";
import adminApi from "@/app/admin/_lib/axios";

export const updateProduct = async (id: number, data: ProductData) => {
  try {
    const res = await adminApi.patch(`/products/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
