import React from "react";
import OurService from "./components/OurService";
import JsonLd from "@/components/JsonLd";

export default function AboutUs() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Fitrock",
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : process.env.NEXT_PUBLIC_FRONT_END_URL + "/about-us",
        }}
      />
      <div>
        <div className="relative w-full bg-[url(/Fitrock-assets/imgs/happy-gym-couple.png)] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 mx-auto flex max-w-6xl items-center px-6 py-20 md:px-12 md:py-28 lg:py-36">
            <div className="max-w-3xl text-left text-white">
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
                About Fitrock
              </span>
              <h1 className="mt-4 text-3xl font-bold md:text-5xl lg:text-6xl">
                About Us
              </h1>
              <p className="mt-4 text-lg font-medium text-white/90 md:text-2xl">
                Your Source of Quality Dumbbells &amp; Fitness Excellence
              </p>
              <p className="mt-4 max-w-3xl text-sm text-gray-200 md:text-base">
                We craft premium, durable fitness equipment for serious athletes
                and everyday enthusiasts alike — built to last, priced to fit.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-customOrange">
                Our Story
              </p>
              <h2 className="mt-1 text-2xl font-bold md:text-4xl">Who We Are</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
                khrklsjhrlkjaklsjr alsraklujrkelaja asurlkaukelrujkela asrr ser
                aega eageasfearluaj aalsuelktuergkuekslgujkea
                glkaukelrauskleualktg lausklruaklukergue a;gua;sue;luekgjk
                gejrhgjrewhirgh grgerg
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-customOrange">
                Our Goal
              </p>
              <h2 className="mt-1 text-2xl font-bold md:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
                khrklsjhrlkjaklsjr alsraklujrkelaja asurlkaukelrujkela asrr ser
                aega eageasfearluaj aalsuelktuergkuekslgujkea
                glkaukelrauskleualktg
              </p>
            </div>
          </div>

          <div className="mt-14">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-customOrange">
                What we offer
              </p>
              <h2 className="mt-1 text-2xl font-bold md:text-4xl">
                Our Services
              </h2>
            </div>
            <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </>
  );
}
