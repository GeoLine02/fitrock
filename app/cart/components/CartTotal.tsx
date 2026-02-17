"use client";

import Button from "@/components/Button";
import { RootState } from "@/state/store";
import { calculateCartTotal } from "@/utils/calculateCartTotal";
import { useSelector } from "react-redux";

export default function CartTotal() {
  const { cart, selectedItems } = useSelector(
    (state: RootState) => state.CartReducer,
  );

  const selectedCart = cart.filter((item) => selectedItems.includes(item.id));
  const total = calculateCartTotal(selectedCart);

  return (
    <div className="flex justify-center items-center w-full mt-2">
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 w-full">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Cart Totals</h2>

        <hr className="border-gray-200 mb-4" />

        <div className="flex justify-between items-center mb-4 gap-3">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Coupon Code
          </span>
          <input
            type="text"
            placeholder="Apply Coupon"
            className="w-full max-w-35 px-2 py-1.5 text-sm border border-gray-300 rounded outline-none placeholder-gray-400"
          />
        </div>

        <hr className="border-gray-200 mb-4" />

        <div className="flex justify-between items-baseline mb-5">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">${total}</span>
        </div>

        <Button classname="w-full" bgColor="orange">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
