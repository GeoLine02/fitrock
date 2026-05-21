import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  fullWidth?: boolean;
  helperText?: string;
}

export const FormTextarea = ({
  label,
  error,
  register,
  fullWidth = true,
  helperText,
  className = "",
  rows = 3,
  ...rest
}: FormTextareaProps) => {
  const baseClasses =
    "w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all";
  const borderClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-orange-500";

  const textareaClasses = `${baseClasses} ${borderClasses} ${className}`;

  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-semibold uppercase text-gray-700 sm:text-sm mb-2">
        {label}
        {rest.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        rows={rows}
        className={textareaClasses}
        {...register}
        {...rest}
      />
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
