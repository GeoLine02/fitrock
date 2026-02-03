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
    <div
      className="
        group
        bg-gray-50
        w-70
        rounded-3xl
        p-4
        flex
        flex-col
        items-center
        cursor-pointer
        transition-all
        duration-300
        ease-out
        hover:scale-105
        hover:-translate-y-2
        hover:shadow-xl
        hover:shadow-gray-400/40
      "
    >
      <Image
        src={CardImage}
        alt="service icon"
        className="w-20 h-20 mb-4 transition-transform duration-300 group-hover:scale-110"
      />

      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-medium transition-colors duration-300 group-hover:text-black">
          {label}
        </h1>

        <p className="text-lg font-semibold text-gray-700">{desc}</p>
      </div>
    </div>
  );
}
