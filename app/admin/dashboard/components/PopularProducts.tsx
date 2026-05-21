"use client";

import { BarChart } from "@mui/x-charts/BarChart";

export default function PopularProducts() {
  const dataset = [
    { product: "25 kilo dumbbell", pcs: 20 },
    { product: "30 kilo dumbbell", pcs: 30 },
    { product: "35 kilo dumbbell", pcs: 40 },
    { product: "40 kilo dumbbell", pcs: 50 },
    { product: "45 kilo dumbbell", pcs: 60 },
    { product: "50 kilo dumbbell", pcs: 70 },
  ];

  const valueFormatter = (value: number | null) =>
    value != null ? `${value} pcs` : "0 pcs";

  return (
    <div className="space-y-2 border-2 p-4 border-gray-200 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold">Popular Products</h1>

      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: "product" }]}
        series={[
          {
            dataKey: "pcs",
            valueFormatter,
          },
        ]}
        layout="horizontal"
        height={250}
      />
    </div>
  );
}
