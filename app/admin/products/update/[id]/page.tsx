import UpdateProductForm from "./components/UpdateProductForm";
import { getProductById } from "./services";
import { prisma } from "@/lib/prisma";

interface UpdateProductProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UpdateProduct({ params }: UpdateProductProps) {
  const { id } = await params;

  const [productById, filters, categories] = await Promise.all([
    getProductById(Number(id)),
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
    <div>
      <UpdateProductForm
        productId={Number(id)}
        product={productById}
        weightFilterOptions={weightFilterOptions}
        categoryOptions={categoryOptions}
      />
    </div>
  );
}
