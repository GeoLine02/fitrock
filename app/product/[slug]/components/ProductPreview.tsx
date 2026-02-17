"use client";

import Image from "next/image";
import Dumbbells from "@/public/Fitrock-assets/imgs/dumbbells.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation } from "swiper/modules";

export default function ProductPreview() {
  const images = new Array(5).fill(Dumbbells);

  return (
    <div className="w-full lg:max-w-3xl mt-4 user-select: none;">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          className="product-main-swiper rounded-lg"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center">
              <div className="w-full max-w-2xl">
                <Image
                  src={src}
                  alt={`Product image ${idx + 1}`}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-4">
          <Swiper
            spaceBetween={"auto"}
            slidesPerView={4}
            watchSlidesProgress
            className="product-thumbs-swiper"
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx} className="cursor-pointer max-w-24!">
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-100">
                  <Image
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
