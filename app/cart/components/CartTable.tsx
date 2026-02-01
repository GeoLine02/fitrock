import CartItem from "./CartItem";
import CardPicture from "@/public/Fitrock-assets/imgs/dumbbells.png";

export default function CartTable() {
  return (
    <div className="flex justify-center mt-2 w-full">
      <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
        {/* Header (desktop only) */}
        <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-4 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-1 text-right">Total</div>
          <div className="col-span-1 text-center" />
        </div>

        <CartItem
          img={CardPicture}
          label="15 LB Hex Dumbbells"
          price={59.99}
          quantity={1}
        />
        <CartItem
          img={CardPicture}
          label="40 LB Adjustable Dumbbells"
          price={139.99}
          quantity={2}
        />
        <CartItem
          img={CardPicture}
          label="25 LB Dumbbells"
          price={89.99}
          quantity={1}
        />
      </div>
    </div>
  );
}
