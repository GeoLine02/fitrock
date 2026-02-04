import ProductsFilter from "./components/ProductsFilter";
import ProductsList from "./components/ProductsList";

export default function ProductsPage() {
  return (
    <div className="flex gap-4 px-12 mt-6">
      <ProductsFilter />
      <ProductsList />
    </div>
  );
}
