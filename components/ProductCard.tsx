import Image from "next/image";
import React from "react";
import ProductImage from "@/public/Fitrock-assets/imgs/dumbbells.png";

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
    <div className="max-w-65 p-2 border-2 border-gray-300 rounded-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Image src={ProductImage} alt="" className="border-b border-gray-300" />
      <h1 className="text-2xl font-medium">{label}</h1>
      <p className="font-medium line-clamp-2 ">{description}</p>
      <h2 className="text-2xl font-bold">{price}</h2>
    </div>
  );
}
