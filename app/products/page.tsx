import ProductsFilter from "./components/ProductsFilter";
import ProductsList from "./components/ProductsList";

export default function ProductsPage() {
  return (
    <div className="px-4 md:px-12 mt-4">
      <ProductsFilter />
      <ProductsList />
    </div>
  );
}
