import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { LOW_STOCK_THRESHOLD } from "@/app/api/admin/_lib/validations";

async function ensureAdmin() {
  const auth = await requireAdmin();
  if (!auth.ok) {
    throw new Error("Unauthorized");
  }
}

export async function getUserCount() {
  await ensureAdmin();
  return prisma.user.count({ where: { role: "USER" } });
}

export async function getProductsCount() {
  await ensureAdmin();
  return prisma.product.count();
}

export async function getLowInStockProducts() {
  await ensureAdmin();
  const products = await prisma.product.findMany({
    where: { product_quantity: { lte: LOW_STOCK_THRESHOLD } },
    orderBy: { product_quantity: "asc" },
  });
  return { products };
}
