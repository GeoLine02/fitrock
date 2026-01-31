import Image from "next/image";
import React from "react";
import ProductImage from "@/public/Fitrock-assets/imgs/dumbbells.png";
import Button from "./Button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  label: string;
  description: string;
  price: number;
}

export default function ProductCard({
  label,
  description,
  price,
}: ProductCardProps) {
  return (
    <div className="cursor-pointer max-w-65 p-2 border-2 border-gray-300 rounded-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl bg-white">
      <Image
        src={ProductImage}
        alt=""
        className="border-b rounded-md border-gray-300"
      />
      <h1 className="text-2xl font-medium line-clamp-1 mt-2 ">{label}</h1>
      <p className="font-medium line-clamp-2 ">{description}</p>
      <h2 className="text-2xl font-bold">{price}GEL</h2>
      <Button
        bgColor="black"
        classname=" flex gap-5 w-full justify-center font-medium mt-2"
      >
        add to cart <ShoppingCart />
      </Button>
    </div>
  );
}
