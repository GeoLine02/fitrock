import { Dumbbell } from "lucide-react";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 group">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-customOrange text-white shadow-sm transition-transform duration-200 group-hover:rotate-[-8deg] group-hover:scale-105">
        <Dumbbell size={20} strokeWidth={2.5} />
      </span>
      <span className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-customOrange">
        Tsona
      </span>
    </div>
  );
}
