import Image from "next/image";
import ProductImage from "@/public/Fitrock-assets/imgs/dumbbells.png";
import Button from "./Button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  label: string;
  price: number;
  id: number;
}

export default function ProductCard({ label, price }: ProductCardProps) {
  return (
    <div className="cursor-pointer max-w-40 md:max-w-56 p-2 border-2 border-gray-300 rounded-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl bg-white">
      <Image
        src={ProductImage}
        alt=""
        className="border-b rounded-md border-gray-300"
      />
      <h1 className="text-lg md:text-xl font-medium line-clamp-1 mt-2 ">
        {label}
      </h1>
      <h2 className="text-base md:text-lg font-bold">{price}GEL</h2>
      <Button
        bgColor="black"
        classname="flex gap-2 md:gap-5 w-full justify-center font-medium mt-2 text-sm md:text-base whitespace-nowrap"
      >
        add to cart <ShoppingCart className="w-4" />
      </Button>
    </div>
  );
}
