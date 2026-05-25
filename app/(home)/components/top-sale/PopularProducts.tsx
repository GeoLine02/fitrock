import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPopularProducts } from "./services";
import PopularProductsCarousel from "./PopularProductsCarousel";

export default async function PopularProducts() {
  const products = await getPopularProducts();

  if (products.length === 0) return null;

  return (
    <section className="px-4 xl:px-12 mt-14">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-customOrange">
            Best sellers
          </p>
          <h1 className="text-2xl font-bold text-neutral-900 md:text-4xl">
            Popular Products
          </h1>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 transition-colors hover:text-customOrange"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      <PopularProductsCarousel products={products} />
    </section>
  );
}
