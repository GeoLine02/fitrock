import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function OurDetals() {
  return (
    <div className="w-full md:h-full xl:h-102.5 xl:shrink-0 flex gap-5">
      <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col gap-4 w-full h-full">
        <h1 className="text-2xl font-semibold">Our Details</h1>

        {/* Phone */}
        <div className="flex items-center gap-3 text-gray-700">
          <Phone className="w-5 h-5 text-orange-500" />
          <span>555 650 010</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="w-5 h-5 text-orange-500" />
          <span>fitrock@gmail.com</span>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3 text-gray-700">
          <MapPin className="w-5 h-5 text-orange-500 mt-1" />
          <span>
            7a ბესარიონ ჟღენტის ქუჩა, <br />
            თბილისი 0102
          </span>
        </div>

        {/* Map */}
      </div>
    </div>
  );
}
