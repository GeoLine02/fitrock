import React from "react";
interface ButtonProps {
  width?: string;
  classname?: string;
  children: React.ReactNode;
  bgColor: "black" | "orange";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
export default function Button({
  width,
  classname,
  children,
  bgColor,
  type = "button",
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${classname} px-4 md:px-6 py-1 md:py-2 ${bgColor === "black" ? "bg-black" : "bg-customOrange"} cursor-pointer hover:bg-gray-700 transition-all duration-200 text-white rounded-md ${width}`}
    >
      {children}
    </button>
  );
}
