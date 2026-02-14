import api from "@/utils/axios";

export async function increaseProductQuantity(cartItemId: number) {
  try {
    const res = await api.patch("/cart/quantity/increase");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function decreaseProductQuantity(cartItemId: number) {
  try {
    const res = await api.patch("/cart/quantity/decrease", {
      cartItemId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
