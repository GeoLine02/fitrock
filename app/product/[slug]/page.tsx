import JsonLd from "@/components/JsonLd";
import ProductPreview from "./components/ProductPreview";
import ProductStats from "./components/ProductStats";
import { getProductDetails } from "./services";

interface ProductDetaislProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetails({ params }: ProductDetaislProps) {
  const [_productName, productId] = (await params).slug.split("-");
  const product = await getProductDetails(Number(productId));
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4 px-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Fitrock",
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : process.env.NEXT_PUBLIC_FRONT_END_URL +
                `/product/${_productName}-${productId}`,
        }}
      />
      <ProductPreview />
      <ProductStats
        id={product.id}
        description={product.product_description}
        label={product.product_name}
        price={product.product_price}
        inStock={product.product_quantity}
      />
    </div>
  );
}
