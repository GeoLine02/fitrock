"use client";

import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Paid", value: 50, color: "#4F46E5" },
  { label: "Pending", value: 25, color: "#F59E0B" },
  { label: "Cancelled", value: 15, color: "#EF4444" },
  { label: "Refunded", value: 10, color: "#10B981" },
];

export default function OrderStatusPie() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-xl font-bold mb-4">Order Status</h1>

      <div className="flex flex-col xl:flex-row items-center gap-8">
        <PieChart
          series={[
            {
              innerRadius: 50,
              outerRadius: 100,
              data,
              arcLabel: (item) => `${((item.value / total) * 100).toFixed(0)}%`,
            },
          ]}
          hideLegend={true}
          height={250}
        />

        <div className="flex flex-col gap-3">
          {data.map((item) => {
            const percentage = ((item.value / total) * 100).toFixed(0);

            return (
              <div
                key={item.label}
                className="flex items-center justify-between w-40"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>

                <span className="text-sm font-semibold">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
