"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProductData } from "../types";
import { addProductService, uploadProductImages } from "../services";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ProductForm from "../../components/ProductForm";

interface CreateProductFormProps {
  categoryOptions: { value: string; label: string }[];
}

export default function CreateProductForm({
  categoryOptions,
}: CreateProductFormProps) {
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

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onSubmit = async (data: ProductData) => {
    try {
      const res = await addProductService(data);
      if (res?.status !== 201) {
        toast.error("Failed to create product.");
        return;
      }

      const productId = res.data?.product?.id as number | undefined;
      if (productId && imageFiles.length > 0) {
        try {
          await uploadProductImages(productId, imageFiles);
        } catch (err) {
          console.error(err);
          toast.warn(
            "Product created, but some images failed to upload.",
          );
          reset();
          setImageFiles([]);
          return;
        }
      }

      toast.success("Product Created Successfully!");
      reset();
      setImageFiles([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product.");
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
