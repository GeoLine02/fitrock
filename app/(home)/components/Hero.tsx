import Button from "@/components/Button";
import { ArrowRight, ShieldCheck, Truck, Award } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[420px] w-full bg-[url(/Fitrock-assets/imgs/hero-banner.png)] bg-cover bg-center bg-no-repeat md:h-[500px]">
        {/* Gradient overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-customOrange" />
              New arrivals available
            </span>

            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Quality Dumbbells <br /> For Your Workout
            </h1>
            <p className="max-w-lg text-base text-white/90 md:text-xl">
              Premium dumbbells perfect for home gyms and fitness enthusiasts —
              built to last.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/products">
                <Button bgColor="orange" classname="text-sm md:text-base">
                  Shop Now
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/about-us">
                <Button
                  bgColor="black"
                  classname="text-sm md:text-base bg-white/10! hover:bg-white/20! border border-white/30 backdrop-blur-sm"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div className="container mx-auto -mt-6 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:grid-cols-3 md:gap-6 md:p-5">
          {[
            {
              icon: Truck,
              title: "Fast shipping",
              desc: "Delivered to your door",
            },
            {
              icon: ShieldCheck,
              title: "Quality guarantee",
              desc: "Backed by warranty",
            },
            {
              icon: Award,
              title: "Premium materials",
              desc: "Built to last for years",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-customOrange/10 text-customOrange">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  {title}
                </p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
