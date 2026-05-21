"use client";

import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "../create/components/index";
import ImageUpload from "@/app/admin/_components/ui/Upload";
import { ProductData } from "../create/types";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { ClipLoader } from "react-spinners";

interface ProductFormProps {
  onSubmit: (data: ProductData) => void;
  handleSubmit: UseFormHandleSubmit<ProductData, ProductData>;
  register: UseFormRegister<ProductData>;
  reset: UseFormReset<ProductData>;
  isSubmitting: boolean;
  action: "create" | "update";
}

export default function ProductForm({
  onSubmit,
  register,
  reset,
  handleSubmit,
  action,
  isSubmitting,
}: ProductFormProps) {
  const categoryOptions = [
    { value: "10", label: "10 kilo" },
    { value: "15", label: "15 kilo" },
    { value: "20", label: "20 kilo" },
    { value: "30", label: "30 kilo" },
  ];

  return (
    <div>
      <div className="mx-auto w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg bg-white p-4 shadow-md sm:space-y-6 sm:p-6 lg:p-8"
        >
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            {action === "create" ? "Create New Product" : "Update Product"}
          </h1>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            <FormInput
              label="Product Name"
              placeholder="Enter product name"
              fullWidth={true}
              register={register("name")}
            />

            <FormInput
              type="number"
              label="Price (USD)"
              placeholder="0.00"
              step="0.01"
              register={register("price")}
            />

            <FormInput
              type="number"
              label="Weight"
              placeholder="0"
              register={register("weight")}
            />
            <FormInput
              type="number"
              label="Discount"
              placeholder="0%"
              register={register("discount")}
            />
            <FormInput
              type="number"
              label="Quantity"
              placeholder="1"
              register={register("quantity")}
            />

            <FormSelect
              label="Category"
              options={categoryOptions}
              register={register("categoryId")}
            />

            <FormTextarea
              label="Description"
              placeholder="Describe your product..."
              register={register("description")}
              fullWidth={true}
            />

            <ImageUpload multiple={true} className="lg:max-w-1/2" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 pt-4 sm:pt-6">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-orange-500 px-4 py-2.5 sm:py-3 font-semibold text-white transition-all hover:bg-orange-600 active:scale-95 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <ClipLoader />
              ) : action === "create" ? (
                "Create Product"
              ) : (
                "Update Product"
              )}
            </button>
            <button
              type="reset"
              onClick={() => reset()}
              className="flex-1 rounded-lg bg-gray-100 px-4 py-2.5 sm:py-3 font-semibold text-gray-700 transition-all hover:bg-gray-200 active:scale-95 text-sm sm:text-base border border-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
