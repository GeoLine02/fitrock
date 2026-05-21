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
  const colorStyles =
    bgColor === "black"
      ? "bg-neutral-900 hover:bg-neutral-700 active:bg-neutral-800 focus-visible:ring-neutral-900/40"
      : "bg-customOrange hover:bg-orange-600 active:bg-orange-700 focus-visible:ring-customOrange/40";

  return (
    <button
      type={type}
      disabled={disabled}
      {...rest}
      className={`
        inline-flex items-center justify-center gap-2
        px-4 md:px-6 py-2 md:py-2.5
        ${colorStyles}
        font-medium text-white
        rounded-lg
        shadow-sm hover:shadow-md
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-4
        ${!disabled ? "cursor-pointer active:translate-y-px" : "cursor-not-allowed opacity-50 hover:shadow-sm"}
        ${width ?? ""}
        ${classname ?? ""}
      `}
    >
      {children}
    </button>
  );
}
