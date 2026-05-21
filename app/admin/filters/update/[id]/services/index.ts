import adminApi from "@/app/admin/_lib/axios";

export async function updateWeightFilter(weight: number, filterId: number) {
  try {
    const res = await adminApi.patch(`/filters/${filterId}`, {
      weightAmount: weight,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
