"use client";

import { ComponentType, MouseEvent, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "@/state/store";
import {
  decreseCartItemQuantity,
  increaseCartItemQuantity,
  saveCartItems,
} from "@/state/features/cartSlice";
import { useUser } from "@/providers/UserProvider";
import api from "@/utils/axios";
import {
  addToCart,
  decreaseProductQuantityService,
  increaseProductQuantityService,
} from "@/app/cart/services/index.client";

export interface AddToCartButtonProps {
  onClick: (event?: MouseEvent) => void;
  disabled?: boolean;
}

export interface WithAddToCartProps {
  productId: number;
  inStock?: number;
  quantityToAdd?: number;
}

export default function withAddToCart<P extends AddToCartButtonProps>(
  Wrapped: ComponentType<P>,
) {
  function WithAddToCart(
    props: Omit<P, keyof AddToCartButtonProps> & WithAddToCartProps,
  ) {
    const { productId, inStock, quantityToAdd = 1, ...rest } = props;
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useUser();
    const cartItem = useSelector((state: RootState) =>
      state.cartReducer.cart.find((i) => i.product_id === productId),
    );
    const [isPending, setIsPending] = useState(false);

    const stopNav = (event?: MouseEvent) => {
      event?.preventDefault();
      event?.stopPropagation();
    };

    const handleAdd = async (event?: MouseEvent) => {
      stopNav(event);
      try {
        setIsPending(true);

        if (!user?.id) {
          toast.warn("You are not logged in");
          return;
        }
        await addToCart(productId, user.id, quantityToAdd);
        const res = await api.get("/cart");
        dispatch(saveCartItems(res.data));
        toast.success("Added to cart");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error?.response?.data?.type === "ALREADY_IN_CART") {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong. Try again");
        }
      } finally {
        setIsPending(false);
      }
    };

    const handleIncrease = async (event?: MouseEvent) => {
      stopNav(event);
      if (!cartItem) return;
      if (inStock !== undefined && cartItem.product_quantity >= inStock) return;
      dispatch(increaseCartItemQuantity(cartItem.id));
      try {
        await increaseProductQuantityService(cartItem.id);
      } catch {
        dispatch(decreseCartItemQuantity(cartItem.id));
        toast.error("Something went wrong. Try again");
      }
    };

    const handleDecrease = async (event?: MouseEvent) => {
      stopNav(event);
      if (!cartItem || cartItem.product_quantity <= 1) return;
      dispatch(decreseCartItemQuantity(cartItem.id));
      try {
        await decreaseProductQuantityService(cartItem.id);
      } catch {
        dispatch(increaseCartItemQuantity(cartItem.id));
        toast.error("Something went wrong. Try again");
      }
    };

    if (cartItem) {
      const atMax =
        inStock !== undefined && cartItem.product_quantity >= inStock;
      return (
        <div
          onClick={stopNav}
          className="inline-flex w-full items-stretch justify-between overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <button
            type="button"
            onClick={handleDecrease}
            disabled={cartItem.product_quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 items-center justify-center text-neutral-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={16} />
          </button>
          <span className="flex flex-1 items-center justify-center text-sm font-semibold text-neutral-900">
            {cartItem.product_quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            disabled={atMax}
            aria-label="Increase quantity"
            className="flex h-9 w-9 items-center justify-center text-neutral-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>
      );
    }

    const injected = {
      onClick: handleAdd,
      disabled: isPending,
    } as unknown as P;

    return <Wrapped {...(rest as unknown as P)} {...injected} />;
  }

  WithAddToCart.displayName = `withAddToCart(${
    Wrapped.displayName ?? Wrapped.name ?? "Component"
  })`;

  return WithAddToCart;
}
