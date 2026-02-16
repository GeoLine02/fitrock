import { Trash } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface CartItemProps {
  img: StaticImageData;
  label: string;
  price: number;
  quantity: number;
  discount: number; // percentage (example: 20 for 20%)
}

export default function CartItem({
  img,
  label,
  price,
  quantity,
  discount,
}: CartItemProps) {
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  const total = discountedPrice * quantity;

  return (
    <div className="border-b border-gray-100 p-4 md:p-0">
      <div className="grid grid-cols-1 md:grid-cols-12 md:items-center md:px-6 md:py-5 gap-4">
        {/* Product */}
        <div className="md:col-span-5 flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4 accent-customOrange" />

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
            <button className="w-8 h-8 rounded-md bg-customOrange text-white flex items-center justify-center">
              −
            </button>

            <span className="w-6 text-center">{quantity}</span>

            <button className="w-8 h-8 rounded-md bg-customOrange text-white flex items-center justify-center">
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
          <button className="text-gray-400 hover:text-red-500 transition">
            <Trash size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
