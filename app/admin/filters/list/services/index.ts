import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";

async function ensureAdmin() {
  const auth = await requireAdmin();
  if (!auth.ok) throw new Error("Unauthorized");
}

export async function getFilters(page: number, limit: number) {
  await ensureAdmin();

  const skip = (Math.max(1, page) - 1) * Math.max(1, limit);
  const [filters, totalRows] = await Promise.all([
    prisma.filter.findMany({
      skip,
      take: limit,
      orderBy: { id: "asc" },
    }),
    prisma.filter.count(),
  ]);

  return { filters, totalRows };
}

export async function getFilter(filterId: number) {
  await ensureAdmin();
  const filter = await prisma.filter.findUnique({ where: { id: filterId } });
  if (!filter) throw new Error("Filter not found");
  return filter;
}
