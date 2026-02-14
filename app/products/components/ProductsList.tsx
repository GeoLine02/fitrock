"use client";

import ProductCard from "@/components/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";

const ProductsList = () => {
  const { data, status, error } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-4">
      {data.pages.map((page) => {
        return (
          <div key={page.currentPage}>
            {page.products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                label={product.product_name}
                price={product.product_price}
                discount={product.product_discount}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
