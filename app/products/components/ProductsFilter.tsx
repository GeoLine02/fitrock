"use client";

import { FiltersType } from "@/types/filters";
import { ActiveFilters } from "./ProductsContainer";
import { ChangeEvent, useEffect, useState } from "react";
import DropDown from "@/components/DropDown";
import {
  ArrowDownUp,
  Filter as FilterIcon,
  Search,
  Tag,
  X,
  PackageCheck,
} from "lucide-react";
import { ProductSort } from "../services";

interface ProductsFilterProps {
  filtersData: FiltersType[];
  filters: ActiveFilters;
  setFilters: React.Dispatch<React.SetStateAction<ActiveFilters>>;
}

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A → Z" },
  { value: "name_desc", label: "Name: Z → A" },
  { value: "discount_desc", label: "Biggest Discount" },
];

const PRICE_PRESETS: { label: string; min?: number; max?: number }[] = [
  { label: "Under $50", max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "$200+", min: 200 },
];

const ProductsFilter = ({
  filtersData,
  filters,
  setFilters,
}: ProductsFilterProps) => {
  // Debounced search — keep input snappy without spamming requests.
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  useEffect(() => {
    const id = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchInput || undefined,
      }));
    }, 300);
    return () => clearTimeout(id);
  }, [searchInput, setFilters]);

  const handleSelectWeight = (filter: FiltersType) => {
    setFilters((prev) => ({
      ...prev,
      weightId: prev.weightId === filter.id ? undefined : filter.id,
    }));
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : Number(value),
    }));
  };

  const applyPreset = (min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const isPresetActive = (min?: number, max?: number) =>
    filters.minPrice === min && filters.maxPrice === max;

  const toggleOnSale = () =>
    setFilters((p) => ({ ...p, onSale: p.onSale ? undefined : true }));

  const toggleInStock = () =>
    setFilters((p) => ({ ...p, inStock: p.inStock ? undefined : true }));

  const setSort = (value: ProductSort) =>
    setFilters((p) => ({ ...p, sort: value }));

  const resetAll = () => {
    setFilters({});
    setSearchInput("");
  };

  const currentSort = SORT_OPTIONS.find((s) => s.value === filters.sort);
  const activeWeight = filtersData.find((f) => f.id === filters.weightId);

  const activeChips: { key: string; label: string; clear: () => void }[] = [];
  if (filters.search)
    activeChips.push({
      key: "search",
      label: `“${filters.search}”`,
      clear: () => {
        setSearchInput("");
        setFilters((p) => ({ ...p, search: undefined }));
      },
    });
  if (activeWeight)
    activeChips.push({
      key: "weight",
      label: `${activeWeight.weight_amount} kg`,
      clear: () => setFilters((p) => ({ ...p, weightId: undefined })),
    });
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined)
    activeChips.push({
      key: "price",
      label: `${filters.minPrice ?? 0} – ${filters.maxPrice ?? "∞"} $`,
      clear: () =>
        setFilters((p) => ({ ...p, minPrice: undefined, maxPrice: undefined })),
    });
  if (filters.onSale)
    activeChips.push({
      key: "onSale",
      label: "On Sale",
      clear: () => setFilters((p) => ({ ...p, onSale: undefined })),
    });
  if (filters.inStock)
    activeChips.push({
      key: "inStock",
      label: "In Stock",
      clear: () => setFilters((p) => ({ ...p, inStock: undefined })),
    });

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md md:p-6">
      {/* Top row: search + sort */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-9 text-sm text-neutral-800 placeholder-gray-400 transition-all focus:border-customOrange focus:outline-none focus:ring-2 focus:ring-customOrange/30"
          />
          {searchInput && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchInput("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 md:w-64">
          <ArrowDownUp size={16} className="shrink-0 text-gray-500" />
          <DropDown>
            <DropDown.Trigger>
              {currentSort?.label ?? "Sort by"}
            </DropDown.Trigger>
            <DropDown.Menu>
              {SORT_OPTIONS.map((opt) => (
                <DropDown.Item
                  key={opt.value}
                  active={filters.sort === opt.value}
                  onClick={() => setSort(opt.value)}
                >
                  {opt.label}
                </DropDown.Item>
              ))}
            </DropDown.Menu>
          </DropDown>
        </div>
      </div>

      <div className="my-4 h-px bg-gray-100" />

      {/* Body: weight | price | toggles */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weight */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <FilterIcon size={16} className="text-customOrange" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Weight (kg)
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filtersData.map((filter) => {
              const active = filters.weightId === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => handleSelectWeight(filter)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                    active
                      ? "border-customOrange bg-customOrange text-white shadow-sm"
                      : "border-gray-300 bg-white text-neutral-700 hover:border-customOrange hover:text-customOrange"
                  }`}
                >
                  {filter.weight_amount} kg
                </button>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Tag size={16} className="text-customOrange" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Price Range
            </h2>
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {PRICE_PRESETS.map((preset) => {
              const active = isPresetActive(preset.min, preset.max);
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset.min, preset.max)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                    active
                      ? "border-customOrange bg-customOrange/10 text-customOrange"
                      : "border-gray-200 bg-gray-50 text-neutral-600 hover:border-customOrange/50 hover:text-customOrange"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label
                className="block text-xs font-medium text-gray-600"
                htmlFor="priceFrom"
              >
                Min
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <input
                  id="priceFrom"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-7 pr-3 text-sm text-gray-700 transition-all focus:border-customOrange focus:bg-white focus:outline-none focus:ring-2 focus:ring-customOrange/30"
                  type="number"
                  placeholder="0"
                  min="0"
                  name="minPrice"
                  onChange={handlePriceChange}
                  value={filters.minPrice ?? ""}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label
                className="block text-xs font-medium text-gray-600"
                htmlFor="priceTo"
              >
                Max
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <input
                  id="priceTo"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-7 pr-3 text-sm text-gray-700 transition-all focus:border-customOrange focus:bg-white focus:outline-none focus:ring-2 focus:ring-customOrange/30"
                  type="number"
                  placeholder="999"
                  min="0"
                  name="maxPrice"
                  value={filters.maxPrice ?? ""}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <PackageCheck size={16} className="text-customOrange" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Availability
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 transition-colors hover:border-customOrange/50">
              <span className="text-sm font-medium text-neutral-700">
                On sale only
              </span>
              <input
                type="checkbox"
                checked={!!filters.onSale}
                onChange={toggleOnSale}
                className="h-4 w-4 cursor-pointer accent-customOrange"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 transition-colors hover:border-customOrange/50">
              <span className="text-sm font-medium text-neutral-700">
                In stock only
              </span>
              <input
                type="checkbox"
                checked={!!filters.inStock}
                onChange={toggleInStock}
                className="h-4 w-4 cursor-pointer accent-customOrange"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Active:
          </span>
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1 rounded-full bg-customOrange/10 px-2.5 py-1 text-xs font-medium text-customOrange"
            >
              {chip.label}
              <button
                type="button"
                aria-label={`Clear ${chip.key}`}
                onClick={chip.clear}
                className="rounded-full p-0.5 hover:bg-customOrange/20"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={resetAll}
            className="ml-auto text-xs font-medium text-gray-500 underline-offset-2 hover:text-customOrange hover:underline"
          >
            Reset all
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsFilter;
