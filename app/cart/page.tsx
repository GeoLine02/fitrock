import CartTable from "./components/CartTable";
import CartTotal from "./components/CartTotal";

export default function Cart() {
  return (
    <div className="w-full px-4 lg:px-12">
      {/* Page content */}
      <div className="mt-4">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-6">
          Shopping Cart
        </h1>

        {/* Cart layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Cart table */}
          <div className="w-full lg:flex-1">
            <CartTable />
          </div>

          {/* Cart totals */}
          <div className="w-full lg:w-85">
            <CartTotal price={429.96} />
          </div>
        </div>
      </div>
    </div>
  );
}
