import adminApi from "@/app/admin/_lib/axios";
import { ProductData } from "../types";

export const addProductService = async (data: ProductData) => {
  try {
    const res = await adminApi.post("/products", data);
    console.log(res.data);
    return res;
  } catch (error) {
    console.error("Error adding product:", error);
  }
};
