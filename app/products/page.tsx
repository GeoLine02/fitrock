import React from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div>
      <div className="py-5">
        <div className="w-full flex justify-between items-center border-b pb-4 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="border rounded px-3 py-2 flex items-center gap-1 cursor-pointer">
              Sort by
              <span className="text-xs">▾</span>
            </div>

            <div className="border rounded px-3 py-2 flex items-center gap-1 cursor-pointer">
              Featured
              <span className="text-xs">▾</span>
            </div>
          </div>

          <div className="border rounded px-3 py-2 flex items-center gap-1 cursor-pointer">
            Show
            <span className="font-medium">12</span>
            Results
            <span className="text-xs">▾</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
        <ProductCard id={1} label="Heavy Dumbbell" price={3} />
        <ProductCard id={2} label="Heavy Dumbbell" price={3} />
        <ProductCard id={3} label="Heavy Dumbbell" price={3} />
        <ProductCard id={4} label="Heavy Dumbbell" price={3} />
        <ProductCard id={5} label="Heavy Dumbbell" price={3} />
      </div>
    </div>
  );
}
