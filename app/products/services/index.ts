import { CartItemType } from "@/types/cart";
import { ProductPreviewCard } from "@/types/products";
import api from "@/utils/axios";

export type ProductSort =
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc"
  | "discount_desc"
  | "newest";

export interface AllProductsResult {
  products: ProductPreviewCard[];
  currentPage: number;
  nextPage: number | null;
  total?: number;
  cart: CartItemType[];
}

interface GetAllProductsParams {
  pageParam: number;
  weightFilterId?: number;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: ProductSort;
  onSale?: boolean;
  inStock?: boolean;
}

export async function getAllProducts({
  pageParam,
  weightFilterId,
  categoryId,
  minPrice,
  maxPrice,
  search,
  sort,
  onSale,
  inStock,
}: GetAllProductsParams): Promise<AllProductsResult> {
  try {
    const queryParams = new URLSearchParams({ page: String(pageParam) });

    if (weightFilterId !== undefined)
      queryParams.append("weightFilterId", String(weightFilterId));
    if (categoryId !== undefined)
      queryParams.append("categoryId", String(categoryId));
    if (minPrice !== undefined)
      queryParams.append("minPrice", String(minPrice));
    if (maxPrice !== undefined)
      queryParams.append("maxPrice", String(maxPrice));
    if (search && search.trim().length > 0)
      queryParams.append("search", search.trim());
    if (sort) queryParams.append("sort", sort);
    if (onSale) queryParams.append("onSale", "true");
    if (inStock) queryParams.append("inStock", "true");

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

export async function getAllCategories() {
  try {
    const res = await api.get("/categories");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
