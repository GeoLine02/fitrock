import JsonLd from "@/components/JsonLd";
import ProductPreview from "./components/ProductPreview";
import ProductStats from "./components/ProductStats";
import { getProductDetails } from "./services";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

interface ProductDetaislProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetails({ params }: ProductDetaislProps) {
  const slug = (await params).slug;
  const lastDash = slug.lastIndexOf("-");
  const _productName = lastDash === -1 ? slug : slug.slice(0, lastDash);
  const productId = lastDash === -1 ? slug : slug.slice(lastDash + 1);
  const id = Number(productId);
  if (!Number.isFinite(id)) notFound();

  const product = await getProductDetails(id);
  if (!product) notFound();
  return (
    <div className="px-4 py-6 lg:px-0 lg:py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Tsona",
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : process.env.NEXT_PUBLIC_URL +
                `/product/${_productName}-${productId}`,
        }}
      />

      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1 text-xs text-gray-500">
        <Link href="/" className="hover:text-customOrange">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/products" className="hover:text-customOrange">
          Products
        </Link>
        <ChevronRight size={12} />
        <span className="line-clamp-1 max-w-50 text-neutral-700">
          {product.product_name}
        </span>
      </nav>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <ProductPreview
          images={product.images ?? []}
          productName={product.product_name}
        />
        <ProductStats
          id={product.id}
          description={product.product_description}
          label={product.product_name}
          price={product.product_price}
          inStock={product.product_quantity}
        />
      </div>
    </div>
  );
}
