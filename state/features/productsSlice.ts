import { ProductPreviewCard } from "@/types/products";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  products: ProductPreviewCard[];
}

const initialState: InitialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    saveProducts: (state, action) => {
      const products = action.payload as ProductPreviewCard[];
      state.products = products;
    },
  },
});

export const { saveProducts } = productsSlice.actions;
export default productsSlice.reducer;
