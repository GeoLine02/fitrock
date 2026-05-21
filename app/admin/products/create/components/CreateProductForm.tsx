"use client";

import { useForm } from "react-hook-form";
import { ProductData } from "../types";
import { addProductService } from "../services";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ProductForm from "../../components/ProductForm";

export default function CreateProductForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      price: null,
      categoryId: null,
      description: "",
      discount: 0,
      weight: 1,
      quantity: 1,
    },
  });

  const onSubmit = async (data: ProductData) => {
    const res = await addProductService(data);

    if (res?.status === 201) {
      toast.success("Product Created Successfully!");
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
        action="create"
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
