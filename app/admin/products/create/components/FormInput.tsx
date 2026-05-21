import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  fullWidth?: boolean;
  helperText?: string;
}

export const FormInput = ({
  label,
  error,
  register,
  fullWidth = false,
  helperText,
  className = "",
  ...rest
}: FormInputProps) => {
  const baseClasses =
    "w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all";
  const borderClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-orange-500";

  const inputClasses = `${baseClasses} ${borderClasses} ${className}`;

  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-semibold uppercase text-gray-700 sm:text-sm mb-2">
        {label}
        {rest.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input className={inputClasses} {...register} {...rest} />
      {error && (
        <p className="mt-1 text-xs sm:text-sm text-red-500 font-medium">
          {error.message}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs sm:text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
