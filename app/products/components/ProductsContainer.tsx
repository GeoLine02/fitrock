"use client";

import { useState } from "react";
import ProductsFilter from "./ProductsFilter";
import ProductsList from "./ProductsList";
import { FiltersType } from "@/types/filters";
import { ProductSort } from "../services";

interface Props {
  filtersData: FiltersType[];
}

export interface ActiveFilters {
  weightId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: ProductSort;
  onSale?: boolean;
  inStock?: boolean;
}

const ProductsContainer = ({ filtersData }: Props) => {
  const [filters, setFilters] = useState<ActiveFilters>({});

  return (
    <div className="space-y-4">
      <ProductsFilter
        filtersData={filtersData}
        filters={filters}
        setFilters={setFilters}
      />

      <ProductsList filters={filters} />
    </div>
  );
};

export default ProductsContainer;
