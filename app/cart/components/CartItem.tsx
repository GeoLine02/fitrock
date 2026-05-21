"use client";

import { Minus, Plus, Trash } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import {
  decreaseProductQuantityService,
  deleteProduct,
  increaseProductQuantityService,
} from "../services/index.client";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  decreseCartItemQuantity,
  deleteCartItem,
  increaseCartItemQuantity,
  selectCartItem,
} from "@/state/features/cartSlice";

interface CartItemProps {
  id: number;
  img: StaticImageData;
  label: string;
  price: number;
  intStock: number;
  quantity: number;
  discount: number;
  isSelected: boolean;
}

export default function CartItem({
  id,
  img,
  label,
  price,
  quantity,
  discount,
  intStock,
  isSelected,
}: CartItemProps) {
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  const initialTotal = discountedPrice * quantity;
  const dispatch = useDispatch();
  const [total, setTotal] = useState<number>(initialTotal);

  useEffect(() => {
    setTotal(discountedPrice * quantity);
  }, [quantity, discountedPrice]);

  const handleIncreaseQuantity = async () => {
    try {
      if (quantity < intStock) {
        dispatch(increaseCartItemQuantity(id));
        const res = await increaseProductQuantityService(id);
        if (res?.data.message) {
          return;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        toast.error("Something went wrong. Try again");
      }
    }
  };

  const handleDecreaseQuantity = async () => {
    try {
      if (quantity < intStock) {
        dispatch(decreseCartItemQuantity(id));
        const res = await decreaseProductQuantityService(id);
        if (res?.data.message) {
          return;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        toast.error("Something went wrong. Try again");
      }
    }
  };

  const handleDeleteItem = async () => {
    try {
      const res = await deleteProduct(id);
      if (res?.status === 200) {
        dispatch(deleteCartItem(id));
        toast.success("Item deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectItem = () => {
    dispatch(selectCartItem(id));
  };

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-12 md:items-center md:gap-2 md:px-6 md:py-5">
        {/* Product */}
        <div className="flex items-center gap-3 md:col-span-5">
          <input
            onChange={handleSelectItem}
            checked={isSelected}
            type="checkbox"
            className="h-4 w-4 cursor-pointer accent-customOrange"
          />

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-50">
            <Image
              src={img}
              alt={label}
              className="h-14 w-14 object-contain"
            />
          </div>

          <span className="line-clamp-2 text-sm font-medium text-gray-800">
            {label}
          </span>
        </div>

        {/* Price */}
        <div className="flex justify-between text-sm md:col-span-2 md:block md:text-right">
          <span className="text-gray-500 md:hidden">Price</span>

          <div className="flex items-center gap-2 md:flex-col md:items-end md:gap-1">
            {discount > 0 ? (
              <>
                <span className="text-gray-400 line-through">
                  ${price.toFixed(2)}
                </span>
                <span className="font-semibold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="font-medium text-gray-800">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between md:col-span-3 md:justify-center">
          <span className="text-sm text-gray-500 md:hidden">Quantity</span>

          <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
            <button
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-9 w-9 items-center justify-center text-neutral-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={16} />
            </button>

            <span className="w-9 text-center text-sm font-medium text-neutral-900">
              {quantity}
            </span>

            <button
              onClick={handleIncreaseQuantity}
              disabled={quantity >= intStock}
              aria-label="Increase quantity"
              className="flex h-9 w-9 items-center justify-center text-neutral-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between md:col-span-1 md:justify-end">
          <span className="text-sm text-gray-500 md:hidden">Total</span>
          <span className="text-sm font-semibold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Delete */}
        <div className="flex justify-end md:col-span-1">
          <button
            onClick={handleDeleteItem}
            aria-label="Remove item"
            className="rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
