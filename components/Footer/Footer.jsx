import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div className="flex justify-between mt-10 p-10 bg-gray-50 rounded-2xl">
      <div className=" flex flex-col gap-2 ">
        <h1 className="text-4xl">Fitrock</h1>
        <p>
          premium quality dumbbells <br /> for fitness enthusiasts
        </p>
        <div className="flex gap-5 mt-2">
          <Facebook />
          <Instagram />
          <Twitter />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Quick Links</h1>
        <li>Home</li>
        <li>Shop</li>
        <li>Contact</li>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Costumer Service</h1>
        <li>FAQ</li>
        <li>Shopping & Returns</li>
        <li>Privacy Police</li>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Contact Us</h1>
        <li className="flex gap-2">
          <Mail />
          info@dombbells.com
        </li>
        <li className="flex gap-2">
          <Phone />
          (995)+577156618
        </li>
        <li className="flex gap-2">
          <MapPin /> N.L Prochis N6
        </li>
      </div>
    </div>
  );
}
