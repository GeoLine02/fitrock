import React from "react";
import TableImg from "@/public/Fitrock-assets/imgs/dumbbells.png";
import Image from "next/image";
import Button from "@/components/Button";
import ProductInfo from "./components/PurchaseInfo";

export default function ProductDetals() {
  return (
    <div className="mt-5">
      <div className=" py-5 flex gap-10">
        <Image className="w-[50%] " alt="dumbbells" src={TableImg} />
        <div>
          <ProductInfo
            dec="or 4 interest-free payments of $25.00 with Klarna."
            label="50 lB Adjustable Dumbbell"
            price={99.99}
            id={1}
            quickFeatures={[
              "Easy Adjust",
              "safety Lock Frenchanos in tent ochorusting",
              "Ergmomic Grip an htalamews",
            ]}
          />
          <div className="py-7 flex gap-4">
            <Button classname="w-[50%] font-medium" bgColor="black">
              Add to Cart
            </Button>
            <Button classname="w-[50%] font-medium" bgColor="orange">
              Buy it Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
