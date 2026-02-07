import Image from "next/image";
import ProductImage from "@/public/Fitrock-assets/imgs/dumbbells.png";
import Button from "./Button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: number;
  label: string;
  price: number;
}

export default function ProductCard({ label, price }: ProductCardProps) {
  return (
    <div
      className="
      border-2 rounded-lg border-gray-200 p-2 lg:p-4 space-y-1 bg-white flex flex-col cursor-pointer duration-200 w-full max-w-75
      hover:shadow-xl
      transition-shadow
      shrink-0
    "
    >
      {/* Image */}
      <div className="relative w-full aspect-square mb-3">
        <Image src={ProductImage} alt={label} fill className="object-contain" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h1
          title={label}
          className="text-sm sm:text-base font-medium truncate text-ellipsis leading-snug max-w-[9em] line-clamp-1"
        >
          {label}
        </h1>

        <p className="mt-1 text-sm sm:text-base font-bold">{price} GEL</p>
      </div>

      {/* Button */}
      <Button
        bgColor="black"
        classname="mt-3 flex items-center justify-center gap-2 w-full text-xs sm:text-sm py-2 whitespace-nowrap"
      >
        Add to cart
        <ShoppingCart className="w-4 h-4" />
      </Button>
    </div>
  );
}
