import api from "@/utils/axios";

export async function checkoutSelected(cartItemIds: number[]) {
  const res = await api.post("/orders/checkout", { cartItemIds });
  return res.data;
}
