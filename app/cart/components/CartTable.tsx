"use client";

import { CartItemType } from "@/types/cart";
import CartItem from "./CartItem";
import CardPicture from "@/public/Fitrock-assets/imgs/dumbbells.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { saveCartItems } from "@/state/features/cartSlice";

interface CartTableProps {
  cartItemsData: CartItemType[];
}

export default function CartTable({ cartItemsData }: CartTableProps) {
  const { cart, selectedItems } = useSelector(
    (state: RootState) => state.cartReducer,
  );
  console.log("cart", cart);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(saveCartItems(cartItemsData));
  }, [dispatch, cartItemsData]);

  return (
    <div className="flex justify-center mt-2 w-full">
      <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white">
        {/* Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-12 items-center bg-gray-50 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <div className="col-span-5">Product</div>

          {/* Updated Price Header */}
          <div className="col-span-2 text-right">Unit Price</div>

          <div className="col-span-3 text-center">Quantity</div>

          <div className="col-span-1 text-right">Total</div>
        </div>

        {/* Cart Items */}
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              img={CardPicture}
              label={item.product.product_name}
              price={item.product.product_price}
              quantity={item.product_quantity}
              intStock={item.product.product_quantity}
              discount={item.product.product_discount ?? 0}
              isSelected={selectedItems.includes(item.id)}
            />
          ))
        ) : (
          <div className="py-12 text-center text-gray-500 text-sm">
            Your cart is empty.
          </div>
        )}
      </div>
    </div>
  );
}
