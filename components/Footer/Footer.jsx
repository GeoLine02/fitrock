"use client";

import {
  Dumbbell,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  if (
    pathName.startsWith("/sign-in") ||
    pathName.startsWith("/sign-up") ||
    pathName.startsWith("/admin")
  )
    return null;

  return (
    <footer className="mt-16 border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-customOrange text-white shadow-sm">
              <Dumbbell size={20} strokeWidth={2.5} />
            </span>
            <h1 className="text-2xl font-bold tracking-tight">Fitrock</h1>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-gray-600">
            Premium quality dumbbells and gym equipment for fitness enthusiasts
            and home gyms.
          </p>
          <div className="mt-2 flex gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <button
                key={i}
                aria-label="social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:-translate-y-0.5 hover:border-customOrange hover:text-customOrange hover:shadow-md"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-neutral-900">
            Quick Links
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-customOrange"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="transition-colors hover:text-customOrange"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="transition-colors hover:text-customOrange"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="transition-colors hover:text-customOrange"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-neutral-900">
            Customer Service
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-gray-600">
            <li className="cursor-pointer transition-colors hover:text-customOrange">
              FAQ
            </li>
            <li className="cursor-pointer transition-colors hover:text-customOrange">
              Shipping &amp; Returns
            </li>
            <li className="cursor-pointer transition-colors hover:text-customOrange">
              Privacy Policy
            </li>
            <li className="cursor-pointer transition-colors hover:text-customOrange">
              Terms of Service
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-neutral-900">Contact Us</h2>
          <ul className="flex flex-col gap-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-customOrange" />
              info@fitrock.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-customOrange" />
              +995 577 156 618
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-customOrange" />
              N.L Prochis N6
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-gray-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Fitrock. All rights reserved.</span>
          <span>Built for fitness enthusiasts.</span>
        </div>
      </div>
    </footer>
  );
}
