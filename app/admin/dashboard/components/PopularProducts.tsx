"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import type { PopularProductRow } from "@/lib/analytics";

interface PopularProductsProps {
  data: PopularProductRow[];
}

const valueFormatter = (value: number | null) =>
  value != null ? `${value} pcs` : "0 pcs";

export default function PopularProducts({ data }: PopularProductsProps) {
  const hasData = data.length > 0;
  const dataset = data.map((d) => ({
    product: d.productName,
    pcs: d.totalQuantity,
  }));

  return (
    <div className="space-y-2 border-2 p-4 border-gray-200 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold">Popular Products</h1>

      {hasData ? (
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: "band", dataKey: "product" }]}
          series={[{ dataKey: "pcs", valueFormatter }]}
          layout="horizontal"
          height={250}
        />
      ) : (
        <div className="flex h-[250px] items-center justify-center text-sm text-gray-400">
          No orders yet — popularity is based on sold quantities
        </div>
      )}
    </div>
  );
}
