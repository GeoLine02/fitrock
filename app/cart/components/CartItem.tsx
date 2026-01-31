import Image, { StaticImageData } from "next/image";
import React from "react";

interface CartItemProps {
  img: StaticImageData;
  label: string;
  price: number;
  totalAmount: number;
  quantity: number;
}

export default function CartItem({
  img,
  label,
  price,
  quantity,
  totalAmount,
}: CartItemProps) {
  return (
    <div className="flex justify-center ">
      <div className="grid grid-cols-12 items-center px-4 py-4 bg-white border-b border-gray-100 w-300">
        {/* Product image + label */}
        <div className="col-span-7 flex items-center gap-3">
          <Image className="w-16 h-16 object-contain" alt={label} src={img} />
          <span className="text-sm text-gray-800">{label}</span>
        </div>

        {/* Price */}
        <div className="col-span-1 text-sm text-gray-800 text-right">
          ${price.toFixed(2)}
        </div>

        {/* Quantity stepper */}
        <div className="col-span-3 flex items-center justify-center gap-2">
          <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
            −
          </button>
          <span className="text-sm w-4 text-center text-gray-800">
            {quantity}
          </span>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
            +
          </button>
        </div>

        {/* Total + delete */}
        <div className="col-span-1 flex items-center justify-end gap-3">
          <span className="text-sm text-gray-800">
            ${totalAmount.toFixed(2)}
          </span>
          <button className="text-gray-400 hover:text-red-500 transition text-base">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
