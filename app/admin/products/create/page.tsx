import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import CreateProductForm from "./components/CreateProductForm";

export default async function AddProduct() {
  const auth = await requireAdmin();
  if (!auth.ok) throw new Error("Unauthorized");

  const [filters, categories] = await Promise.all([
    prisma.filter.findMany({ orderBy: { id: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const weightFilterOptions = filters.map((f) => ({
    value: String(f.id),
    label: `${f.weight_amount} kilo`,
  }));
  const categoryOptions = categories.map((c) => ({
    value: String(c.id),
    label: c.name,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <CreateProductForm
        weightFilterOptions={weightFilterOptions}
        categoryOptions={categoryOptions}
      />
    </div>
  );
}
