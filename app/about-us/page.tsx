import React from "react";
import OurService from "./components/OurService";

export default function AboutUs() {
  return (
    <div>
      <div className="bg-[url(/Fitrock-assets/imgs/happy-gym-couple.png)] bg-no-repeat bg-center bg-cover w-full h-[320px] md:h-[420px] lg:h-[560px] flex items-center lg:justify-start">
        <div className="max-w-6xl w-full px-6 md:px-12 py-12 md:py-20 text-white text-left lg:pl-24">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            About Us
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-medium">
            Your Source of Quality Dumbbells & Fitness Excellence
          </p>
          <p className="mt-4 text-sm md:text-base text-gray-200 max-w-3xl">
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Who We Are</h2>
            <p className="text-sm md:text-base leading-relaxed">
              khrklsjhrlkjaklsjr alsraklujrkelaja asurlkaukelrujkela asrr ser
              aega eageasfearluaj aalsuelktuergkuekslgujkea
              glkaukelrauskleualktg lausklruaklukergue a;gua;sue;luekgjk
              gejrhgjrewhirgh grgerg
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-sm md:text-base leading-relaxed">
              khrklsjhrlkjaklsjr alsraklujrkelaja asurlkaukelrujkela asrr ser
              aega eageasfearluaj aalsuelktuergkuekslgujkea
              glkaukelrauskleualktg
            </p>
          </div>
        </div>

        <div className="mt-12 place-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <OurService
            desc="Our knowledgeable and friendly team is here to offer expert advice & support to help you make informed decisions."
            label="Expert Support"
          />
          <OurService
            desc="High quality dumbbells sourced for durability and performance."
            label="Premium Products"
          />
          <OurService
            desc="Fast shipping and easy returns across supported regions."
            label="Fast Delivery"
          />
          <OurService
            desc="Dedicated to customer satisfaction and continuous improvement."
            label="Customer Focus"
          />
        </div>
      </div>
    </div>
  );
}
