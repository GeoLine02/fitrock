import ProductsContainer from "./components/ProductsContainer";
import { getAllFilters } from "./services";

export default async function ProductsPage() {
  const filters = await getAllFilters();
  return (
    <div className="px-4 md:px-12 mt-4">
      <ProductsContainer filtersData={filters} />
    </div>
  );
}
