import { LineChart } from "@mui/x-charts/LineChart";

export default function SalesChart() {
  return (
    <div className="space-y-2 border-2 p-4 border-gray-200 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold">Sales Overview</h1>

      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          },
        ]}
        series={[
          {
            data: [1000, 2000, 3000, 8500, 1500, 5000],
          },
        ]}
        height={300}
      />
    </div>
  );
}
