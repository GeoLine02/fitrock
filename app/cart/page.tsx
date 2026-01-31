import React from "react";
import CartTable from "./components/CartTable";
import CartItem from "./components/CartItem";
import CartIthemImage from "@/public/Fitrock-assets/imgs/dumbbells.png";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 border-b border-gray-200">
        <div className=" mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Link href={"/"}>
              <span className="cursor-pointer">Home</span>
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Cart</span>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold px-90 py-4">Shopping Cart</h1>
        <CartTable />
      </div>
    </div>
  );
}
