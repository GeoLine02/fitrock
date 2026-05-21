interface Order {
  id: string;
  userName: string;
  totalAmount: number;
  status: "paid" | "pending" | "cancelled" | "refunded";
}

const dummyOrders: Order[] = [
  { id: "1001", userName: "Jane Doe", totalAmount: 53.2, status: "paid" },
  { id: "1002", userName: "Bob Smith", totalAmount: 120.0, status: "pending" },
  {
    id: "1003",
    userName: "Alice Johnson",
    totalAmount: 35.5,
    status: "cancelled",
  },
  { id: "1004", userName: "Mark Lee", totalAmount: 75.99, status: "refunded" },
];

const statusStyles = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "refunded":
      return "bg-blue-100 text-blue-800";
    default:
      return "";
  }
};

export default function RecentOrders() {
  return (
    <div className="p-4 border-2 border-gray-200 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold">Recent Orders</h1>

      <div className="mt-4 overflow-auto max-h-[300px]">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.id} className="border-t border-gray-200">
                <td className="px-4 py-2">#{order.id}</td>
                <td className="px-4 py-2">{order.userName}</td>
                <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                <td
                  className={`px-4 py-2 capitalize ${statusStyles(order.status)}`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
