import adminApi from "@/app/admin/_lib/axios";

export async function createCategory(name: string) {
  const res = await adminApi.post("/categories", { name });
  return res;
}
