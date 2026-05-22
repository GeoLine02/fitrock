"use client";

import Image from "next/image";
import FallbackImage from "@/public/Fitrock-assets/imgs/dumbbells.png";
import Button from "./Button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import withAddToCart, { AddToCartButtonProps } from "@/hoc/withAddToCart";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  discount: number;
  inStock?: number;
  imageUrl?: string | null;
}

function ProductCardAddButton({ onClick, disabled }: AddToCartButtonProps) {
  return (
    <Button
      bgColor="black"
      classname="mt-3 w-full text-xs sm:text-sm py-2 whitespace-nowrap"
      onClick={onClick}
      disabled={disabled}
    >
      Add to cart
      <ShoppingCart className="h-4 w-4" />
    </Button>
  );
}

const AddToCartCardButton = withAddToCart(ProductCardAddButton);

export default function ProductCard({
  id,
  name,
  price,
  discount,
  inStock,
  imageUrl,
}: ProductCardProps) {
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round((price - (price * discount) / 100) * 100) / 100
    : price;

  return (
    <Link
      href={`/product/${name}-${id}`}
      className="
        group relative flex w-full max-w-75 shrink-0 flex-col
        rounded-2xl border border-gray-200 bg-white p-3 lg:p-4
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-customOrange/40 hover:shadow-xl
      "
    >
      {hasDiscount && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-customOrange px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
          -{discount}%
        </span>
      )}

      {/* Image */}
      <div className="relative mb-3 w-full aspect-square overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={imageUrl || FallbackImage}
          alt={name}
          fill
          sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <h1
          title={name}
          className="line-clamp-1 w-full truncate text-ellipsis text-sm font-medium leading-snug text-neutral-800 sm:text-base"
        >
          {name}
        </h1>

        <div className="flex items-baseline gap-2">
          <p className="text-sm font-bold text-neutral-900 sm:text-base">
            {discountedPrice} GEL
          </p>
          {hasDiscount && (
            <p className="text-xs text-gray-400 line-through">{price} GEL</p>
          )}
        </div>
      </div>

      <div className="mt-3">
        <AddToCartCardButton productId={id} inStock={inStock} />
      </div>
    </Link>
  );
}
