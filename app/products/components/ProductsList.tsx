"use client";

import ProductCard from "@/components/ProductCard";

const ProductsList = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-4">
      <ProductCard id={1} label="Heavy Dumbbell" price={3} />
      <ProductCard id={2} label="Heavy Dumbbell" price={3} />
      <ProductCard id={3} label="Heavy Dumbbell" price={3} />
      <ProductCard id={4} label="Heavy Dumbbell" price={3} />
      <ProductCard id={5} label="Heavy Dumbbell" price={3} />
      <ProductCard id={6} label="Heavy Dumbbell" price={3} />
    </div>
  );
};

export default ProductsList;
