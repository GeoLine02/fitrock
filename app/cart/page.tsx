import CartTable from "./components/CartTable";
import CartTotal from "./components/CartTotal";
import { getCartItems } from "./services";

export default async function Cart() {
  const cartItems = await getCartItems();

  return (
    <div className="w-full px-4 md:px-0">
      {/* Page content */}
      <div className="mt-4">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-6">
          Shopping Cart
        </h1>

        {/* Cart layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Cart table */}
          <div className="w-full lg:flex-1">
            <CartTable cartItemsData={cartItems} />
          </div>

          {/* Cart totals */}
          <div className="w-full lg:w-85">
            <CartTotal />
          </div>
        </div>
      </div>
    </div>
  );
}
