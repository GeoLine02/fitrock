"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "@/app/admin/categories/components/CategoryForm";
import { updateCategory } from "../services";

interface UpdateCategoryFormProps {
  categoryData: { id: number; name: string };
}

export default function UpdateCategoryForm({
  categoryData,
}: UpdateCategoryFormProps) {
  const [nameInput, setNameInput] = useState<string>(categoryData.name);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateCategory(nameInput.trim(), categoryData.id);
      if (res?.status === 200) toast.success("Category updated!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage || "Failed to update category");
    }
  };

  return (
    <CategoryForm
      mode="update"
      handleSubmit={handleSubmit}
      nameInput={nameInput}
      setNameInput={setNameInput}
    />
  );
}
