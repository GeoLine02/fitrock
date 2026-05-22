import LowStock from "./components/LowStock";
import OrderStatusPie from "./components/OrderStatusPie";
import PopularProducts from "./components/PopularProducts";
import RecentOrders from "./components/RecentOrders";
import SalesChart from "./components/SalesChart";
import TotalCounts from "./components/TotalCounts";
import {
  getLowInStockProducts,
  getProductsCount,
  getUserCount,
} from "./services";
import {
  getMonthlySales,
  getOrderStatusCounts,
  getPopularProducts,
  getRecentOrders,
} from "@/lib/analytics";

export default async function Dashboard() {
  const [
    userCount,
    productsCount,
    lowInStockProducts,
    sales,
    statusCounts,
    recentOrders,
    popularProducts,
  ] = await Promise.all([
    getUserCount(),
    getProductsCount(),
    getLowInStockProducts(),
    getMonthlySales(6),
    getOrderStatusCounts(),
    getRecentOrders(10),
    getPopularProducts(6),
  ]);

  return (
    <div className="space-y-6">
      <TotalCounts userCount={userCount} productsCount={productsCount} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PopularProducts data={popularProducts} />
        <SalesChart sales={sales} />
      </div>
      <div className="grid grid-cols-1 xs md:grid-cols-2 xl:grid-cols-3 gap-6">
        <OrderStatusPie counts={statusCounts} />
        <RecentOrders orders={recentOrders} />
        <LowStock lowStockProducts={lowInStockProducts.products} />
      </div>
    </div>
  );
}
