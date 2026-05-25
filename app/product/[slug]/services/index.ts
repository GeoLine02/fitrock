import { Product } from "@/types/products";
import api from "@/utils/axios";
import { isAxiosError } from "axios";

export async function getProductDetails(
  productId: number,
): Promise<Product | null> {
  try {
    const res = await api.get(`/products/${productId}`);
    return res.data.product;
  } catch (error) {
    // Missing product -> let the page render a 404 instead of crashing.
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error(error);
    throw error;
  }
}
