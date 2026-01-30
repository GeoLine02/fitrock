import Image from "next/image";
import React from "react";
import HeroBanner from "@/public/Fitrock-assets/imgs/baneri2.png";
import Button from "@/components/Button";
export default function Hero() {
  return (
    <div
      className="w-screen  px-12 py-10 
  bg-[url('/Fitrock-assets/imgs/texture.jfif')] 
  bg-no-repeat bg-cover bg-center"
    >
      <div className="container mx-auto flex justify-center">
        <div className="max-w-140 space-y-4">
          <h1 className="text-5xl font-bold text-white ">
            STONE DUMBBELLS BUILT TO LAST
          </h1>
          <p className=" text-2xl font-medium text-white ">
            Elevate Your Workout with
            <br />
            Our Durable Cement Dumbbells.
          </p>
          <Button label="SHOP NOW" classname="text-white" />
        </div>
        <Image className="h-80 max-w-190 rounded-2xl" src={HeroBanner} alt="" />
      </div>
    </div>
  );
}
