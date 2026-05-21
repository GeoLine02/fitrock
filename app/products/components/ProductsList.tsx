"use client";

import ProductCard from "@/components/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";
import { ActiveFilters } from "./ProductsContainer";
import { ClipLoader } from "react-spinners";
import { PackageX } from "lucide-react";

interface ProductListProps {
  filters: ActiveFilters;
}

const ProductsList = ({ filters }: ProductListProps) => {
  const { data, status, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", filters],
      queryFn: ({ pageParam }) =>
        getAllProducts({
          pageParam,
          weightFilterId: filters.weightId,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search: filters.search,
          sort: filters.sort,
          onSale: filters.onSale,
          inStock: filters.inStock,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  if (status === "pending") {
    return (
      <div className="flex h-64 items-center justify-center">
        <ClipLoader size={40} color="#e47c48" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-sm text-red-700">
        {error.message}
      </div>
    );
  }

  const total = data.pages[0]?.total;
  const isEmpty = data.pages.every((p) => p.products.length === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white py-16 px-6 text-center">
        <PackageX size={36} className="text-gray-400" />
        <h3 className="text-lg font-semibold text-neutral-800">
          No products match your filters
        </h3>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or clearing them to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {total !== undefined && (
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-neutral-800">{total}</span>{" "}
          {total === 1 ? "product" : "products"}
        </p>
      )}

      {data.pages.map((page) => (
        <div
          className="xs:gap-3 grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
          key={page.currentPage}
        >
          {page.products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.product_name}
              price={product.product_price}
              discount={product.product_discount}
            />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 shadow-sm transition-all hover:border-customOrange hover:text-customOrange disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <>
                <ClipLoader size={14} color="#e47c48" />
                Loading…
              </>
            ) : (
              "Load more"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
