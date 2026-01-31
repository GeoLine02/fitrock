import Button from "@/components/Button";
import React from "react";

export default function Hero() {
  return (
    <div className="bg-[url(/Fitrock-assets/imgs/hero-banner.png)] bg-no-repeat bg-cover w-full h-100">
      <div className="pl-20 pt-20 space-y-5">
        <h1 className="text-5xl font-bold text-white">
          Quality Dumbbells <br /> For Your Workout
        </h1>
        <p className="text-2xl text-white font-medium">
          Premium Dumbbells perfect for home <br />
          gyms and fitnes enthavaist
        </p>
        <Button bgColor="orange">Shop Now</Button>
      </div>
    </div>
  );
}
