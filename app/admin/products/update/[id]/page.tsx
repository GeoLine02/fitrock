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

  const [productById, filters] = await Promise.all([
    getProductById(Number(id)),
    prisma.filter.findMany({ orderBy: { id: "asc" } }),
  ]);

  const categoryOptions = filters.map((f) => ({
    value: String(f.id),
    label: `${f.weight_amount} kilo`,
  }));

  return (
    <div>
      <UpdateProductForm
        productId={Number(id)}
        product={productById}
        categoryOptions={categoryOptions}
      />
    </div>
  );
}
