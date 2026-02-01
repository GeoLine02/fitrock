import React from "react";
import CartItem from "./CartItem";
import CardPicture from "@/public/Fitrock-assets/imgs/dumbbells.png";
import CartTotal from "./CartTotal";
export default function CartTable() {
  return (
    <div>
      <div className="flex justify-center py-2">
        <div className="w-300 border border-gray-200  ">
          <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-3">
            <div className="col-span-2 text-sm font-medium text-gray-800">
              Product
            </div>
            <div className="col-span-6 text-sm font-medium text-gray-800 text-right">
              Price
            </div>
            <div className="col-span-2 text-sm font-medium text-gray-800 text-right">
              Quantity
            </div>
            <div className="col-span-2 text-sm font-medium text-gray-800 text-right">
              Total
            </div>
          </div>
        </div>
      </div>
      <CartItem
        img={CardPicture}
        label="Jorikas Mamadzagli Giri"
        price={1}
        quantity={1}
        totalAmount={1}
      />
      <CartTotal price={2} />
    </div>
  );
}
