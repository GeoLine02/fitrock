import Image from "next/image";
import React from "react";
import CardImage from "@/public/Fitrock-assets/imgs/pnh-headset.webp";

interface OurServiceProps {
  image?: React.ReactNode;
  label: string;
  desc: string;
}

export default function OurService({ label, desc }: OurServiceProps) {
  return (
    <div className="group bg-gray-50 w-full max-w-xs sm:max-w-sm rounded-3xl p-4 sm:p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-xl">
      <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 relative">
        <Image
          src={CardImage}
          alt="service icon"
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col items-center gap-3 text-center px-2">
        <h1 className="text-lg sm:text-2xl font-medium transition-colors duration-300 group-hover:text-black">
          {label}
        </h1>

        <p className="text-sm sm:text-base text-gray-700">{desc}</p>
      </div>
    </div>
  );
}
