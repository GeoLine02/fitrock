"use client";

import Button from "@/components/Button";

const ProductsFilter = () => {
  const weightOptions = [1, 2, 5, 10, 15, 20, 25];

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Weight Filter Section */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-600 mb-3">Weight</h2>
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-600">
              Select weight (kg)
            </h2>
            <div className="space-x-2 space-y-2">
              {weightOptions.map((weight) => (
                <Button key={weight} classname="font-medium" bgColor="black">
                  {weight} kg
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Divider - Hidden on mobile */}
        <div className="hidden lg:block w-px h-20 bg-gray-200" />

        {/* Price Filter Section */}
        <div className="flex-1 min-w-70">
          <h2 className="text-lg font-semibold text-gray-600 mb-3">
            Price Range
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-600 block"
                htmlFor="priceFrom"
              >
                Min Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <input
                  id="priceFrom"
                  className="w-full pl-7 pr-3 py-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  type="number"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-600 block"
                htmlFor="priceTo"
              >
                Max Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <input
                  id="priceTo"
                  className="w-full pl-7 pr-3 py-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  type="number"
                  placeholder="999"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
