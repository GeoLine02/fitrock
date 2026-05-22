"use client";

import Button from "@/components/Button";
import { AppDispatch, RootState } from "@/state/store";
import { removeCartItems } from "@/state/features/cartSlice";
import { calculateCartTotal } from "@/utils/calculateCartTotal";
import { Lock, Tag } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkoutSelected } from "../services/checkout";

export default function CartTotal() {
  const { cart, selectedItems } = useSelector(
    (state: RootState) => state.cartReducer,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const selectedCart = cart.filter((item) => selectedItems.includes(item.id));
  const total = calculateCartTotal(selectedCart);
  const itemCount = selectedCart.length;

  const handleCheckout = async () => {
    if (itemCount === 0 || isCheckingOut) return;
    setIsCheckingOut(true);
    try {
      const ids = selectedCart.map((c) => c.id);
      await checkoutSelected(ids);
      dispatch(removeCartItems(ids));
      toast.success("Order placed!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "Checkout failed";
      toast.error(message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="sticky top-24 w-full">
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
        <p className="mt-1 text-xs text-gray-500">
          {itemCount} {itemCount === 1 ? "item" : "items"} selected
        </p>

        <div className="my-4 h-px bg-gray-100" />

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-neutral-800">${total}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span className="font-medium text-neutral-800">Calculated at checkout</span>
          </div>
        </div>

        <div className="my-4 h-px bg-gray-100" />

        <div>
          <label className="mb-1 flex items-center gap-1 text-xs font-medium text-gray-600">
            <Tag size={12} />
            Coupon code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:border-customOrange focus:ring-2 focus:ring-customOrange/30"
            />
            <button
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-neutral-800 transition-colors hover:border-customOrange hover:text-customOrange"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="my-4 h-px bg-gray-100" />

        <div className="mb-4 flex items-baseline justify-between">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">${total}</span>
        </div>

        <Button
          classname="w-full justify-center"
          bgColor="orange"
          disabled={itemCount === 0 || isCheckingOut}
          onClick={handleCheckout}
        >
          {isCheckingOut ? "Placing order..." : "Proceed to Checkout"}
        </Button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <Lock size={12} />
          Secure checkout
        </p>
      </div>
    </div>
  );
}
