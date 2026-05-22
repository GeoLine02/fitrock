"use client";

import Image from "next/image";
import Dumbbells from "@/public/Fitrock-assets/imgs/dumbbells.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation } from "swiper/modules";
import { ProductImagePreview } from "@/types/products";

interface ProductPreviewProps {
  images: ProductImagePreview[];
  productName: string;
}

export default function ProductPreview({
  images,
  productName,
}: ProductPreviewProps) {
  const hasImages = images.length > 0;

  return (
    <div className="w-full lg:max-w-3xl mt-4 user-select: none;">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        {hasImages ? (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            className="product-main-swiper rounded-lg"
          >
            {images.map((img, idx) => (
              <SwiperSlide
                key={img.id}
                className="flex justify-center items-center"
              >
                <div className="relative w-full max-w-2xl aspect-square">
                  <Image
                    src={img.url}
                    alt={`${productName} image ${idx + 1}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="relative w-full max-w-2xl aspect-square mx-auto">
            <Image
              src={Dumbbells}
              alt={productName}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
