"use client";

import Button from "@/components/Button";
import { Check, Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { useState } from "react";
import { addToCart } from "../services";
import { useUser } from "@/providers/UserProvider";
import { toast, ToastContainer } from "react-toastify";

interface ProductStatsProps {
  id: number;
  label: string;
  price: number;
  description: string;
  inStock: number;
}

function ProductStats({
  id,
  label,
  price,
  description,
  inStock,
}: ProductStatsProps) {
  const [quantity, setQuantity] = useState(1);
  const { user } = useUser();

  const increaseQuantity = () => {
    if (quantity < inStock) setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCard = async () => {
    try {
      if (!user?.id) {
        toast.warn("You are not logged in");
        return;
      }

      const res = await addToCart(id, user.id, quantity);
      toast.success(res.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      if (
        error.response.data &&
        error.response.data.type === "ALREADY_IN_CART"
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  const isOutOfStock = inStock === 0;

  return (
    <div className="flex-1 space-y-5 lg:py-4">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 lg:text-4xl">
          {label}
        </h1>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-3xl font-bold text-neutral-900">${price}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        {isOutOfStock ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 font-medium text-red-700">
            <X size={14} />
            Out of stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700">
            <Check size={14} />
            In stock · {inStock} available
          </span>
        )}
      </div>

      <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Description
        </h3>
        <p className="max-w-prose break-words text-sm leading-relaxed text-gray-700">
          {description}
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Quantity
        </h3>
        <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-10 w-10 items-center justify-center text-neutral-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center text-base font-semibold">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            disabled={quantity >= inStock}
            aria-label="Increase quantity"
            className="flex h-10 w-10 items-center justify-center text-neutral-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          onClick={handleAddToCard}
          bgColor="orange"
          type="button"
          disabled={isOutOfStock}
        >
          <ShoppingBag size={16} />
          Add to Cart
        </Button>
        <Button bgColor="black" disabled={isOutOfStock}>
          Order Now
        </Button>
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
        <Truck size={14} className="text-customOrange" />
        Free shipping on orders over $100
      </div>

      <ToastContainer />
    </div>
  );
}

export default ProductStats;
