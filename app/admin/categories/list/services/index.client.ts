import adminApi from "@/app/admin/_lib/axios";

export async function refetchCategories(page: number, limit: number) {
  const res = await adminApi.get(`/categories?page=${page}&limit=${limit}`);
  return res;
}

export async function deleteCategory(categoryId: number) {
  const res = await adminApi.delete(`/categories/${categoryId}`);
  return res;
}
