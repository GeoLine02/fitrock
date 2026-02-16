import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  classname?: string;
  bgColor: "black" | "orange";
}

export default function Button({
  width,
  classname,
  children,
  bgColor,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      {...rest}
      className={`
        ${classname ?? ""}
        px-4 md:px-6 py-1 md:py-2
        ${bgColor === "black" ? "bg-black" : "bg-customOrange"}
        font-medium
        ${!disabled ? "cursor-pointer hover:bg-gray-700" : "cursor-not-allowed opacity-50"}
        transition-all duration-200
        text-white
        rounded-md
        ${width ?? ""}
      `}
    >
      {children}
    </button>
  );
}
