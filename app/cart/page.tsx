import CartTable from "./components/CartTable";
import CartTotal from "./components/CartTotal";
import Link from "next/link";

export default function Cart() {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="w-full bg-gray-100 border-b border-gray-200">
        <div className="mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Link href="/">
              <span className="cursor-pointer">Home</span>
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Cart</span>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="px-4 py-6">
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
