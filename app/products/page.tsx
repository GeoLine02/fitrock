export const dynamic = "force-dynamic";
import JsonLd from "@/components/JsonLd";
import ProductsContainer from "./components/ProductsContainer";
import { getAllCategories, getAllFilters } from "./services";

export default async function ProductsPage() {
  const [filters, categories] = await Promise.all([
    getAllFilters(),
    getAllCategories(),
  ]);
  return (
    <div className="px-4 md:px-0 mt-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Tsona",
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : process.env.NEXT_PUBLIC_URL + "/products",
        }}
      />
      <ProductsContainer filtersData={filters} categoriesData={categories} />
    </div>
  );
}
