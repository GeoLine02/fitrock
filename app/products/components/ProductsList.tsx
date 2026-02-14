"use client";

import ProductCard from "@/components/ProductCard";
import { ProductPreviewCard } from "@/types/products";

interface ProductsListProps {
  products: ProductPreviewCard[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          label={product.product_name}
          price={product.product_price}
          discount={product.product_discount}
        />
      ))}
    </div>
  );
};

export default ProductsList;
