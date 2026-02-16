import { Product } from "@/types/products";
import api from "@/utils/axios";

export async function getProductDetails(productId: number): Promise<Product> {
  try {
    const res = await api.get(`/products/${productId}`);
    return res.data.product;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    throw error.message;
  }
}

export async function addToCart(
  productId: number,
  userId: number,
  productQuantity: number,
) {
  try {
    const res = await api.post("/cart", {
      productId,
      userId,
      productQuantity,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
