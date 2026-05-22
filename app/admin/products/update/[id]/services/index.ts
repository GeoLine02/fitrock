import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";

export const getProductById = async (id: number) => {
  const auth = await requireAdmin();
  if (!auth.ok) throw new Error("Unauthorized");

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error("Product not found");
  return product;
};
