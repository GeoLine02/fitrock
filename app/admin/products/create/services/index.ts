import adminApi from "@/app/admin/_lib/axios";
import { ProductData } from "../types";

export const addProductService = async (data: ProductData) => {
  try {
    const res = await adminApi.post("/products", data);
    return res;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const uploadProductImages = async (productId: number, files: File[]) => {
  if (files.length === 0) return null;
  const form = new FormData();
  form.append("productId", String(productId));
  for (const file of files) {
    form.append("files", file);
  }
  const res = await adminApi.post("/products/images", form);
  return res.data;
};
