import ProductCard from "@/components/ProductCard";
import React from "react";

export default function PopularProducts() {
  return (
    <div>
      <h1 className="flex justify-center text-4xl font-medium mb-5 text-white">
        Popular Products
      </h1>
      <div className="flex gap-5 justify-center">
        <ProductCard
          label="Jorikas Ganteli"
          description="jorikas ganteli aris dzalian tesli"
          price={1304.3}
        />
        <ProductCard
          label="Labas prochidan gamozrobili ganteli"
          description="suniaq"
          price={-2}
        />
        <ProductCard label="20kg Dumbbells" description="heavy" price={3} />
        <ProductCard label="20kg Dumbbells" description="heavy" price={3} />
        <ProductCard label="20kg Dumbbells" description="heavy" price={3} />
      </div>
    </div>
  );
}
