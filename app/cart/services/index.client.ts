import api from "@/utils/axios";

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

export async function decreaseProductQuantityService(cartItemId: number) {
  try {
    const res = await api.patch("/cart/quantity/decrease", {
      cartItemId,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function increaseProductQuantityService(cartItemId: number) {
  try {
    const res = await api.patch("/cart/quantity/increase", {
      cartItemId,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(cartItemId: number) {
  try {
    const res = await api.delete(`/cart/${cartItemId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}
