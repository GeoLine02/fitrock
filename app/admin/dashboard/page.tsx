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

export default async function Dashboard() {
  const userCount = await getUserCount();
  const productsCount = await getProductsCount();
  const lowInStockProducts = await getLowInStockProducts();

  return (
    <div className="space-y-6">
      <TotalCounts userCount={userCount} productsCount={productsCount} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PopularProducts />
        <SalesChart />
      </div>
      <div className="grid grid-cols-1 xs md:grid-cols-2 xl:grid-cols-3 gap-6">
        <OrderStatusPie />
        <RecentOrders />
        <LowStock lowStockProducts={lowInStockProducts.products} />
      </div>
    </div>
  );
}
