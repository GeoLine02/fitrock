"use client";

import { useState } from "react";
import ProductsFilter from "./ProductsFilter";
import ProductsList from "./ProductsList";
import { FiltersType } from "@/types/filters";

interface Props {
  filtersData: FiltersType[];
}

export interface ActiveFilters {
  weightId?: number;
  minPrice?: number;
  maxPrice?: number;
}

const ProductsContainer = ({ filtersData }: Props) => {
  const [filters, setFilters] = useState<ActiveFilters>({});

  return (
    <>
      <ProductsFilter
        filtersData={filtersData}
        filters={filters}
        setFilters={setFilters}
      />

      <ProductsList filters={filters} />
    </>
  );
};

export default ProductsContainer;
