import React from "react";
interface ButtonProps {
  label: string;
  width?: string;
  classname?: string;
  href: string;
}
export default function Button({ label, width, classname, href }: ButtonProps) {
  return (
    <button
      className={`${href}${classname} px-6 py-2 bg-amber-800 cursor-pointer hover:bg-amber-900 transition-all duration-200 ${width}`}
    >
      {label}
    </button>
  );
}
