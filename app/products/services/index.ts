import { ProductPreviewCard } from "@/types/products";
import api from "@/utils/axios";

export interface AllProductsResult {
  products: ProductPreviewCard[];
  currentPage: number;
  nextPage: number | null;
}

interface GetAllProductsParams {
  pageParam: number;
  weightFilterId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export async function getAllProducts({
  pageParam,
  weightFilterId,
  minPrice,
  maxPrice,
}: GetAllProductsParams): Promise<AllProductsResult> {
  try {
    // Build query params dynamically
    const queryParams = new URLSearchParams({ page: String(pageParam) });

    if (weightFilterId !== undefined)
      queryParams.append("weightFilterId", String(weightFilterId));
    if (minPrice !== undefined)
      queryParams.append("minPrice", String(minPrice));
    if (maxPrice !== undefined)
      queryParams.append("maxPrice", String(maxPrice));

    const res = await api.get(`/products?${queryParams.toString()}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllFilters() {
  try {
    const res = await api.get("/filters");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
