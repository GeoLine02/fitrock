import { CartItemType } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  cart: CartItemType[];
  selectedItems: number[];
}

const initialState: InitialState = {
  cart: [],
  selectedItems: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    saveCartItems: (state, action) => {
      const cartItems = action.payload as CartItemType[];
      state.cart = cartItems;
    },

    deleteCartItem: (state, action) => {
      const itemId = action.payload as number;

      state.cart = state.cart.filter((item) => item.id !== itemId);
    },

    increaseCartItemQuantity: (state, action) => {
      const itemId = action.payload as number;

      state.cart = state.cart.map((item) =>
        item.id === itemId
          ? { ...item, product_quantity: item.product_quantity + 1 }
          : item,
      );
    },

    decreseCartItemQuantity: (state, action) => {
      const itemId = action.payload as number;

      state.cart = state.cart.map((item) =>
        item.id === itemId
          ? { ...item, product_quantity: item.product_quantity - 1 }
          : item,
      );
    },

    selectCartItem: (state, action) => {
      const itemId = action.payload as number;
      const isAlreadySelected = state.selectedItems.includes(itemId);

      state.selectedItems = isAlreadySelected
        ? state.selectedItems.filter((id) => id !== itemId) // deselect
        : [...state.selectedItems, itemId]; // select
    },
  },
});

export const {
  saveCartItems,
  deleteCartItem,
  increaseCartItemQuantity,
  decreseCartItemQuantity,
  selectCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
