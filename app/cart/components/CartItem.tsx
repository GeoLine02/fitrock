"use client";

import { Trash } from "lucide-react";
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
  discount: number; // percentage (example: 20 for 20%)
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
        toast.success("Item delected successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectItem = () => {
    dispatch(selectCartItem(id));
  };

  return (
    <div className="border-b border-gray-100 p-4 md:p-0">
      <div className="grid grid-cols-1 md:grid-cols-12 md:items-center md:px-6 md:py-5 gap-4">
        {/* Product */}
        <div className="md:col-span-5 flex items-center gap-3">
          <input
            onChange={handleSelectItem}
            checked={isSelected}
            type="checkbox"
            className="w-4 h-4 accent-customOrange"
          />

          <Image src={img} alt={label} className="w-16 h-16 object-contain" />

          <span className="text-sm font-medium text-gray-800">{label}</span>
        </div>

        {/* Price */}
        <div className="md:col-span-2 md:text-right flex justify-between md:block text-sm">
          <span className="md:hidden text-gray-500">Price</span>

          <div className="flex md:flex-col md:items-end items-center gap-2 md:gap-1">
            {discount > 0 ? (
              <>
                {/* Original price */}
                <span className="text-gray-400 line-through">
                  ${price.toFixed(2)}
                </span>

                {/* Discounted price */}
                <span className="text-gray-900 font-semibold">
                  ${discountedPrice.toFixed(2)}
                </span>

                {/* Discount badge */}
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-medium">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity */}
        <div className="md:col-span-3 flex justify-between md:justify-center items-center">
          <span className="md:hidden text-sm text-gray-500">Quantity</span>

          <div className="flex items-center gap-1">
            <button
              onClick={handleDecreaseQuantity}
              className="w-8 h-8 rounded-md bg-customOrange text-white flex items-center justify-center cursor-pointer"
            >
              −
            </button>

            <span className="w-6 text-center">{quantity}</span>

            <button
              onClick={handleIncreaseQuantity}
              className="w-8 h-8 rounded-md bg-customOrange text-white flex items-center justify-center cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="md:col-span-1 flex justify-between md:justify-end items-center">
          <span className="md:hidden text-sm text-gray-500">Total Price</span>

          <span className="text-sm font-medium text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Delete */}
        <div className="md:col-span-1 flex justify-end">
          <button
            onClick={handleDeleteItem}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <Trash size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
