import { prisma } from "@/lib/prisma";
import { publicUrlForBlobKey } from "@/lib/productImages";
import { ProductPreviewCard } from "@/types/products";

// Popular products for the storefront home page: on-sale items first
// (highest discount), then the newest products, capped at `limit`.
export async function getPopularProducts(
  limit = 12,
): Promise<ProductPreviewCard[]> {
  const products = await prisma.product.findMany({
    take: limit,
    orderBy: [{ product_discount: "desc" }, { createdAt: "desc" }],
    include: { images: { orderBy: { sort_order: "asc" }, take: 1 } },
  });

  return products.map(({ images, ...p }) => ({
    id: p.id,
    product_name: p.product_name,
    product_price: p.product_price,
    product_discount: p.product_discount ?? 0,
    product_quantity: p.product_quantity ?? 0,
    image_url: images[0] ? publicUrlForBlobKey(images[0].blob_key) : null,
  }));
}
