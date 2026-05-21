import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  helperText?: string;
}

export const FormSelect = ({
  label,
  error,
  register,
  options,
  placeholder = "Select an option",
  helperText,
  className = "",
  ...rest
}: FormSelectProps) => {
  const baseClasses =
    "w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all cursor-pointer";
  const borderClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-orange-500";

  const selectClasses = `${baseClasses} ${borderClasses} ${className}`;

  return (
    <div>
      <label className="block text-xs font-semibold uppercase text-gray-700 sm:text-sm mb-2">
        {label}
        {rest.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select className={selectClasses} {...register} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
