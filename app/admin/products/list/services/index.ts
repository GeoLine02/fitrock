import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";

export const getProductsService = async (page: number, limit: number) => {
  const auth = await requireAdmin();
  if (!auth.ok) throw new Error("Unauthorized");

  const skip = (Math.max(1, page) - 1) * Math.max(1, limit);
  const [products, totalRows] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { id: "asc" },
    }),
    prisma.product.count(),
  ]);

  return { products, totalRows };
};
