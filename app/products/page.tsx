import ProductsFilter from "./components/ProductsFilter";
import ProductsList from "./components/ProductsList";
import { getAllProducts } from "./services";

export default async function ProductsPage() {
  const page = 1;
  const products = await getAllProducts(page);

  return (
    <div className="px-4 md:px-12 mt-4">
      <ProductsFilter />
      <ProductsList products={products?.data} />
    </div>
  );
}
