"use client";

import Button from "@/components/Button";
import { Minus, Plus } from "lucide-react";
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
    if (quantity < inStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCard = async () => {
    try {
      if (!user?.id) {
        toast.warn("Your are not logged in");
        return;
      }

      const res = await addToCart(id, user.id, quantity);
      console.log(res);
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

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">{label}</h1>
      <h2 className="text-2xl font-semibold">Price: ${price}</h2>
      <p className="text-gray-600 font-medium max-w-[80%] min-w-0 wrap-break-word leading-relaxed">
        Description: {description}
      </p>
      <p className="text-lg font-medium">In Stock: {inStock}</p>
      <div className="flex items-center space-x-4">
        <button
          onClick={decreaseQuantity}
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold p-2 rounded flex items-center justify-center"
        >
          <Minus />
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold p-2 rounded flex items-center justify-center"
        >
          <Plus />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={handleAddToCard}
          classname="py-2! px-6!"
          bgColor="orange"
          type="button"
          disabled={inStock === 0}
        >
          Add to Cart
        </Button>
        <Button classname="py-2! px-6!" bgColor="black">
          Order Now
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductStats;
