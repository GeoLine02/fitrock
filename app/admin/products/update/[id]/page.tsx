import UpdateProductForm from "./components/UpdateProductForm";
import { getProductById } from "./services";

interface UpdateProductProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UpdateProduct({ params }: UpdateProductProps) {
  const { id } = await params;

  const productById = await getProductById(Number(id));
  return (
    <div>
      <UpdateProductForm productId={Number(id)} product={productById} />
    </div>
  );
}
