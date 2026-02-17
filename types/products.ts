export interface ProductPreviewCard {
  id: number;
  product_name: string;
  product_price: number;
  product_discount: number;
}

export interface Product extends ProductPreviewCard {
  product_quantity: number;
  product_description: string;
}
