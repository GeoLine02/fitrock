import Image from "next/image";
import ProductImage from "@/public/Fitrock-assets/imgs/dumbbells.png";
import Button from "./Button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  label: string;
  price: number;
}

export default function ProductCard({ label, price }: ProductCardProps) {
  return (
    <div className="cursor-pointer w-40 h-60 md:w-55 md:h-70 p-3 border border-gray-300 rounded-2xl bg-white flex flex-col hover:shadow-xl transition">
      {/* Image – fixed height */}
      <div className="relative w-full h-37.5 mb-3">
        <Image src={ProductImage} alt={label} fill className="object-contain" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h1 className="text-sm font-medium line-clamp-2 leading-snug">
          {label}
        </h1>

        <p className="mt-1 text-base font-bold">{price} GEL</p>
      </div>

      {/* Button pinned */}
      <Button
        bgColor="black"
        classname="mt-3 flex items-center justify-center gap-2 w-full text-sm py-2"
      >
        Add to cart
        <ShoppingCart className="w-4 h-4" />
      </Button>
    </div>
  );
}
