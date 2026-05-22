"use client";

import { useState } from "react";
import ProductsFilter from "./ProductsFilter";
import ProductsList from "./ProductsList";
import { FiltersType } from "@/types/filters";
import { CategoryType } from "@/types/categories";
import { ProductSort } from "../services";

interface Props {
  filtersData: FiltersType[];
  categoriesData: CategoryType[];
}

export interface ActiveFilters {
  weightId?: number;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: ProductSort;
  onSale?: boolean;
  inStock?: boolean;
}

const ProductsContainer = ({ filtersData, categoriesData }: Props) => {
  const [filters, setFilters] = useState<ActiveFilters>({});

  return (
    <div className="space-y-4">
      <ProductsFilter
        filtersData={filtersData}
        categoriesData={categoriesData}
        filters={filters}
        setFilters={setFilters}
      />

      <ProductsList filters={filters} />
    </div>
  );
};

export default ProductsContainer;
