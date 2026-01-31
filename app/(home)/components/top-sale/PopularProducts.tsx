"use client";

import ProductCard from "@/components/ProductCard";
import { products } from "@/data/popularProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function PopularProducts() {
  return (
    <div className="px-4 xl:px-0">
      <h1 className="flex justify-center text-4xl font-medium my-5">
        Popular Products
      </h1>
      <Swiper
        className="conatiner"
        spaceBetween={10}
        slidesPerView={"auto"}
        navigation
        modules={[Navigation]}
      >
        {products.map((product, index) => (
          <SwiperSlide className="w-fit!" key={index}>
            <ProductCard label={product.label} price={product.price} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
