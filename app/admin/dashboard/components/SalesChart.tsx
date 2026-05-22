"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import type { MonthlySalesPoint } from "@/lib/analytics";

interface SalesChartProps {
  sales: MonthlySalesPoint[];
}

export default function SalesChart({ sales }: SalesChartProps) {
  const months = sales.map((s) => s.month);
  const totals = sales.map((s) => s.total);
  const hasData = totals.some((t) => t > 0);

  return (
    <div className="space-y-2 border-2 p-4 border-gray-200 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold">Sales Overview</h1>

      {hasData ? (
        <LineChart
          xAxis={[{ scaleType: "point", data: months }]}
          series={[{ data: totals }]}
          height={300}
        />
      ) : (
        <div className="flex h-[300px] items-center justify-center text-sm text-gray-400">
          No paid orders yet
        </div>
      )}
    </div>
  );
}
