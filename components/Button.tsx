import React from "react";
interface ButtonProps {
  label: string;
  width?: string;
  classname?: string;
}
export default function Button({ label, width, classname }: ButtonProps) {
  return (
    <button
      className={`${classname} px-6 py-2 bg-amber-800 cursor-pointer hover:bg-amber-900 transition-all duration-200 ${width}`}
    >
      {label}
    </button>
  );
}
