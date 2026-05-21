import adminApi from "@/app/admin/_lib/axios";

export async function createWeigthFilter(weight: number) {
  try {
    const res = await adminApi.post("/filters", {
      weightAmount: weight,
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
