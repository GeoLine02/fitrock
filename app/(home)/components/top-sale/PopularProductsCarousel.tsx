"use client";

import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductPreviewCard } from "@/types/products";

interface PopularProductsCarouselProps {
  products: ProductPreviewCard[];
}

export default function PopularProductsCarousel({
  products,
}: PopularProductsCarouselProps) {
  return (
    <Swiper
      className="conatiner !pb-2"
      spaceBetween={14}
      slidesPerView={"auto"}
      navigation
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={products.length > 3}
    >
      {products.map((product) => (
        <SwiperSlide className="!w-56 sm:!w-60 md:!w-64" key={product.id}>
          <ProductCard
            id={product.id}
            name={product.product_name}
            price={product.product_price}
            discount={product.product_discount}
            inStock={product.product_quantity}
            imageUrl={product.image_url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
