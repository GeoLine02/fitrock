"use client";

import DropDown from "@/components/DropDown";

const ProductsFilter = () => {
  const weightOptions = [1, 2, 5, 10, 15, 20, 25];

  return (
    <div className="p-4 w-full max-w-50 border-2 space-y-2 border-gray-300">
      <h1 className="text-lg font-medium">Kg</h1>
      <DropDown>
        <DropDown.Trigger>Default</DropDown.Trigger>
        <DropDown.Menu>
          {weightOptions.map((weight) => (
            <DropDown.Item key={weight}>{weight}</DropDown.Item>
          ))}
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export default ProductsFilter;
