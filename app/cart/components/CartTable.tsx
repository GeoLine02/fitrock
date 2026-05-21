"use client";

import { CartItemType } from "@/types/cart";
import CartItem from "./CartItem";
import CardPicture from "@/public/Fitrock-assets/imgs/dumbbells.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { saveCartItems } from "@/state/features/cartSlice";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";

interface CartTableProps {
  cartItemsData: CartItemType[];
}

export default function CartTable({ cartItemsData }: CartTableProps) {
  const { cart, selectedItems } = useSelector(
    (state: RootState) => state.cartReducer,
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(saveCartItems(cartItemsData));
  }, [dispatch, cartItemsData]);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header (Desktop Only) */}
        <div className="hidden grid-cols-12 items-center border-b border-gray-200 bg-gray-50 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600 md:grid">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-right">Unit Price</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-1 text-right">Total</div>
          <div className="col-span-1" />
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
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <ShoppingBag size={26} />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Browse our products and add items to your cart.
              </p>
            </div>
            <Link href="/products">
              <Button bgColor="orange">Browse products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
