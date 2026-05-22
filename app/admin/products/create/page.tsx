import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import CreateProductForm from "./components/CreateProductForm";

export default async function AddProduct() {
  const auth = await requireAdmin();
  if (!auth.ok) throw new Error("Unauthorized");

  const filters = await prisma.filter.findMany({ orderBy: { id: "asc" } });
  const categoryOptions = filters.map((f) => ({
    value: String(f.id),
    label: `${f.weight_amount} kilo`,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <CreateProductForm categoryOptions={categoryOptions} />
    </div>
  );
}
