import Button from "@/components/Button";

interface CardTotalPrice {
  price: number;
}

export default function CartTotal({ price }: CardTotalPrice) {
  return (
    <div className="flex justify-center items-center w-full mt-2">
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 w-full">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Cart Totals</h2>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Subtotal</span>
          <span className="text-sm font-medium text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>

        <hr className="border-gray-200 mb-4" />

        <div className="flex justify-between items-center mb-4 gap-3">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Coupon Code
          </span>
          <input
            type="text"
            placeholder="Apply Coupon"
            className="w-full max-w-35 px-2 py-1.5 text-sm border border-gray-300 rounded outline-none placeholder-gray-400"
          />
        </div>

        <hr className="border-gray-200 mb-4" />

        <div className="flex justify-between items-baseline mb-5">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>

        <Button classname="w-full" bgColor="orange">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
