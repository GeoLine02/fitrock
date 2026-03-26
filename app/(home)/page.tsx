import JsonLd from "@/components/JsonLd";
import Hero from "./components/Hero";
import PopularProducts from "./components/top-sale/PopularProducts";

export default function Home() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Fitrock",
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : process.env.NEXT_PUBLIC_FRONT_END_URL,
        }}
      />
      <Hero />
      <PopularProducts />
    </div>
  );
}
