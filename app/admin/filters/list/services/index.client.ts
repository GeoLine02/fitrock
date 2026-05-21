import adminApi from "@/app/admin/_lib/axios";

export async function refetchFilters(page: number, limit: number) {
  try {
    const res = await adminApi.get(`/filters?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFilter(filterId: number) {
  try {
    const res = await adminApi.delete(`/filters/${filterId}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
