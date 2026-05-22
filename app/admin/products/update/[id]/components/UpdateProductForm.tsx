"use client";

import ProductForm from "@/app/admin/products/components/ProductForm";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { updateProduct } from "../services/index.client";
import { useEffect, useState } from "react";
import type { Product } from "@prisma/client";
import { ProductData } from "@/app/admin/products/create/types";

interface UpdateProductFormProps {
  productId: number;
  product: Product;
  categoryOptions: { value: string; label: string }[];
}

export default function UpdateProductForm({
  productId,
  product,
  categoryOptions,
}: UpdateProductFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      price: 0,
      categoryId: null,
      description: "",
      discount: 0,
      weight: 0,
      quantity: 1,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.product_name,
        price: product.product_price,
        categoryId: product.filter_id ?? null,
        description: product.product_description ?? "",
        discount: product.product_discount ?? 0,
        weight: product.product_weight ?? 0,
        quantity: product.product_quantity ?? 0,
      });
    }
  }, [product, reset]);

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onSubmit = async (data: ProductData) => {
    const res = await updateProduct(Number(productId), data);

    if (res?.status === 200) {
      toast.success("Product Updated Successfully!");
      reset();
    }
  };

  return (
    <div>
      <ProductForm
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        reset={reset}
        action="update"
        imageFiles={imageFiles}
        onImageFilesChange={setImageFiles}
        categoryOptions={categoryOptions}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
