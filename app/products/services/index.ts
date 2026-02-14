import { ProductPreviewCard } from "@/types/products";
import api from "@/utils/axios";

export interface AllProductsResult {
  products: ProductPreviewCard[];
  currentPage: number;
  nextPage: number | null;
}

export async function getAllProducts({
  pageParam,
}: {
  pageParam: number;
}): Promise<AllProductsResult> {
  try {
    console.log("123", pageParam);

    const res = await api.get(`/products?page=${pageParam}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
