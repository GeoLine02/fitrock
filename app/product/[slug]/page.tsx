import { product } from "@/data/product";
import ProductPreview from "./components/ProductPreview";
import ProductStats from "./components/ProductStats";

export default async function ProductDetails() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4 px-4">
      <ProductPreview />
      <ProductStats
        description={product.description}
        label={product.label}
        price={product.price}
        inStock={product.inStock}
      />
    </div>
  );
}
