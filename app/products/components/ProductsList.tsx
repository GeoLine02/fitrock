"use client";

import ProductCard from "@/components/ProductCard";

const ProductsList = () => {
  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 max-w-screen-2xl mx-auto">
        <ProductCard id={1} label="Heavy Dumbbell" price={3} />
        <ProductCard id={2} label="Heavy Dumbbell" price={3} />
        <ProductCard id={3} label="Heavy Dumbbell" price={3} />
        <ProductCard id={4} label="Heavy Dumbbell" price={3} />
        <ProductCard id={5} label="Heavy Dumbbell" price={3} />
        <ProductCard id={6} label="Heavy Dumbbell" price={3} />
      </div>
    </div>
  );
};

export default ProductsList;
