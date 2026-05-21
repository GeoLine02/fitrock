"use client";

import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { popularProducts } from "@/data/popularProducts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PopularProducts() {
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
        loop={true}
      >
        {popularProducts.map((product) => (
          <SwiperSlide className="!w-56 sm:!w-60 md:!w-64" key={product.id}>
            <ProductCard
              id={product.id}
              name={product.label}
              price={product.price}
              discount={Number(product.discount) || 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
