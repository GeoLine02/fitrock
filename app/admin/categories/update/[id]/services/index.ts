import adminApi from "@/app/admin/_lib/axios";

export async function updateCategory(name: string, categoryId: number) {
  const res = await adminApi.patch(`/categories/${categoryId}`, { name });
  return res;
}
