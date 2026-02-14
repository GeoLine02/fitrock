import api from "@/utils/axios";

export async function getAllProducts(page: number) {
  try {
    const res = await api.get(`/products?page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
