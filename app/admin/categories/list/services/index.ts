import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";

async function ensureAdmin() {
  const auth = await requireAdmin();
  if (!auth.ok) throw new Error("Unauthorized");
}

export async function getCategories(page: number, limit: number) {
  await ensureAdmin();

  const skip = (Math.max(1, page) - 1) * Math.max(1, limit);
  const [categories, totalRows] = await Promise.all([
    prisma.category.findMany({
      skip,
      take: limit,
      orderBy: { id: "asc" },
    }),
    prisma.category.count(),
  ]);

  return { categories, totalRows };
}

export async function getCategory(categoryId: number) {
  await ensureAdmin();
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) throw new Error("Category not found");
  return category;
}
