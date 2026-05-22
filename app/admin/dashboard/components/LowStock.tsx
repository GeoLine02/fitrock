import type { Product } from "@prisma/client";

interface LowStockProps {
  lowStockProducts: Product[];
}

export default function LowStock({ lowStockProducts }: LowStockProps) {
  console.log(lowStockProducts);
  return (
    <div className="p-4 border-2 border-gray-200 bg-white rounded-xl shadow-lg space-y-2 overflow-y-auto">
      <h1 className="text-2xl font-bold border-b border-gray-200 pb-2">
        Low Stock Products
      </h1>
      <div className="space-y-2">
        {lowStockProducts.map((product) => (
          <p key={product.id} className="font-semibold">
            ⚠️ {product.product_name} - Only {product.product_quantity} left in
            stock!
          </p>
        ))}
      </div>
    </div>
  );
}
