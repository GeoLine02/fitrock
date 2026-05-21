export const dynamic = "force-dynamic";
import CartTable from "./components/CartTable";
import CartTotal from "./components/CartTotal";
import { getCartItems } from "./services";

export default async function Cart() {
  const cartItems = await getCartItems();

  return (
    <div className="w-full px-4 md:px-0">
      <div className="mt-6 md:mt-8">
        <h1 className="text-2xl font-bold text-neutral-900 lg:text-3xl">
          Shopping Cart
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review your items and proceed to checkout.
        </p>

        <div className="mt-6 flex flex-col items-start gap-6 lg:flex-row">
          <div className="w-full lg:flex-1">
            <CartTable cartItemsData={cartItems} />
          </div>

          <div className="w-full lg:w-80">
            <CartTotal />
          </div>
        </div>
      </div>
    </div>
  );
}
