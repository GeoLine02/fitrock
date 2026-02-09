"use client";

import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "@/types/product.type";
import { popularProducts } from "@/data/popularProducts";

export default function PopularProducts() {
  return (
    <div className="px-4 xl:px-12">
      <h1 className="flex justify-center text-4xl font-medium my-5">
        Popular Products
      </h1>
      <Swiper
        className="conatiner"
        spaceBetween={10}
        slidesPerView={"auto"}
        navigation
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
      >
        {popularProducts.map((product: Product) => (
          <SwiperSlide className="w-fit!" key={product.id}>
            <ProductCard
              id={product.id}
              label={product.label}
              price={product.price}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
