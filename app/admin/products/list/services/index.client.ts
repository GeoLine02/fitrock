import adminApi from "@/app/admin/_lib/axios";

export const refetchProducts = async (page: number, limit: number) => {
  try {
    const res = await adminApi.get(`/products?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const res = await adminApi.delete(`/products/${productId}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
