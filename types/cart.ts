import { Product } from "./products";

export interface CartItemType {
  id: number;
  product_id: number;
  product_quantity: number;
  user_id: number;
  product: Product;
}
