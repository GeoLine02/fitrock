import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const DETAILS = [
  {
    icon: Phone,
    label: "Phone",
    value: "555 650 010",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Tsona@gmail.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "7a ბესარიონ ჟღენტის ქუჩა, თბილისი 0102",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat · 09:00 – 19:00",
  },
];

export default function OurDetals() {
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">
            Our Details
          </h2>
          <p className="text-sm text-gray-500">Reach us through any channel.</p>
        </div>

        <div className="space-y-3">
          {DETAILS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-customOrange/5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-customOrange/10 text-customOrange">
                <Icon size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {label}
                </p>
                <p className="break-words text-sm font-medium text-neutral-800">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
