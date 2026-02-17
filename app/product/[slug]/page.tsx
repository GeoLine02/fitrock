import ProductPreview from "./components/ProductPreview";
import ProductStats from "./components/ProductStats";
import { getProductDetails } from "./services";

interface ProductDetaislProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetails({ params }: ProductDetaislProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_productName, productId] = (await params).slug.split("-");
  const product = await getProductDetails(Number(productId));
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4 px-4">
      <ProductPreview />
      <ProductStats
        id={product.id}
        description={product.product_description}
        label={product.product_name}
        price={product.product_price}
        inStock={product.product_quantity}
      />
    </div>
  );
}
