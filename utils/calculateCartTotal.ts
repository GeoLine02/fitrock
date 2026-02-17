import { CartItemType } from "@/types/cart";

export const calculateCartTotal = (cart: CartItemType[]) => {
  const total = cart.reduce((sum, item) => {
    const discountedPrice =
      item.product.product_price * (1 - item.product.product_discount / 100);

    return sum + discountedPrice * item.product_quantity;
  }, 0);

  return parseFloat(total.toFixed(2));
};
