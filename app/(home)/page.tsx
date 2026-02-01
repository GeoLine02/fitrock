import Hero from "./components/Hero";
import PopularProducts from "./components/top-sale/PopularProducts";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularProducts />
      <Footer />
    </div>
  );
}
