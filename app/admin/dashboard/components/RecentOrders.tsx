import type { RecentOrderRow } from "@/lib/analytics";

interface RecentOrdersProps {
  orders: RecentOrderRow[];
}

const STATUS_STYLES: Record<string, string> = {
  PAID: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  CANCELLED: "bg-red-100 text-red-800",
  REFUNDED: "bg-blue-100 text-blue-800",
};

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="p-4 border-2 border-gray-200 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold">Recent Orders</h1>

      <div className="mt-4 overflow-auto max-h-[300px]">
        {orders.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            No orders yet
          </p>
        ) : (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">#{order.id}</td>
                  <td className="px-4 py-2">{order.userName}</td>
                  <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                        STATUS_STYLES[order.status] ?? ""
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
