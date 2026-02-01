import Button from "@/components/Button";
import React from "react";

interface CardTotalPrice {
  price: number;
}

export default function CartTotal({ price }: CardTotalPrice) {
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div className="bg-white border border-gray-200 rounded-lg p-7 w-80">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Cart Totals</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm text-gray-900 font-medium">
              ${price.toFixed(2)}
            </span>
          </div>
          <hr className="border-gray-200 mb-4" />

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Coupon Code
            </span>
            <input
              type="text"
              placeholder="Apply Coupon"
              className="w-36 px-2 py-1.5 text-sm border border-gray-300 rounded outline-none placeholder-gray-400"
            />
          </div>

          <hr className="border-gray-200 mb-4" />
          <div className="flex justify-between items-baseline mb-5">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
          </div>
          <Button classname="w-full" bgColor="orange">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
