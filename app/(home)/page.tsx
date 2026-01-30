import Header from "@/components/header/Header";
import React from "react";
import Hero from "./components/Hero";
import PopularProducts from "./components/top-sale/PopularProducts";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <PopularProducts />
    </div>
  );
}
