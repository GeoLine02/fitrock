export interface ProductPreviewCard {
  id: number;
  product_name: string;
  product_price: number;
  product_discount: number;
  product_quantity: number;
}

export interface Product extends ProductPreviewCard {
  product_description: string;
}
