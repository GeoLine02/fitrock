export interface ProductPreviewCard {
  id: number;
  product_name: string;
  product_price: number;
  product_discount: number;
  product_quantity: number;
  image_url: string | null;
}

export interface ProductImagePreview {
  id: number;
  url: string;
}

export interface Product extends ProductPreviewCard {
  product_description: string;
  images?: ProductImagePreview[];
}
