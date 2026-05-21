"use client";

import ProductForm from "@/app/admin/products/components/ProductForm";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { updateProduct } from "../services/index.client";
import { useEffect } from "react";
import { Product } from "@/app/admin/_types/products";
import { ProductData } from "@/app/admin/products/create/types";

interface UpdateProductFormProps {
  productId: number;
  product: Product;
}

export default function UpdateProductForm({
  productId,
  product,
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
        categoryId: 1,
        description: product.product_description,
        discount: product.product_discount,
        weight: product.product_weight,
        quantity: product.product_quantity,
      });
    }
  }, [product, reset]);

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
