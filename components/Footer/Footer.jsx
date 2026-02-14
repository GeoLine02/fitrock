"use client";

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  if (pathName.startsWith("/sign-in") || pathName.startsWith("/sign-up"))
    return null;

  return (
    <footer className="mt-10 bg-gray-50 rounded-2xl p-6 sm:p-10">
      <div
        className="grid gap-10 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-4"
      >
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Fitrock</h1>
          <p className="text-gray-600">
            Premium quality dumbbells <br />
            for fitness enthusiasts
          </p>
          <div className="flex gap-4 mt-2">
            <Facebook className="cursor-pointer hover:text-black" />
            <Instagram className="cursor-pointer hover:text-black" />
            <Twitter className="cursor-pointer hover:text-black" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-lg">Quick Links</h1>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">Shop</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-lg">Customer Service</h1>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black cursor-pointer">FAQ</li>
            <li className="hover:text-black cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-lg">Contact Us</h1>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-2">
              <Mail size={18} /> info@dumbbells.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +995 577 156 618
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> N.L Prochis N6
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
