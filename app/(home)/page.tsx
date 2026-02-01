import Header from "@/components/header/Header";
import Hero from "./components/Hero";
import PopularProducts from "./components/top-sale/PopularProducts";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <PopularProducts />
      <Footer />
    </div>
  );
}
