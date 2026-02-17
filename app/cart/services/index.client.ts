import api from "@/utils/axios";

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
    console.log("cart service");
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
