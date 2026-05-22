"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import { createCategory } from "../services";

export default function CreateCategoryForm() {
  const [nameInput, setNameInput] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createCategory(nameInput.trim());
      if (res?.status === 201) {
        toast.success("Category created!");
        setNameInput("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage || "Failed to create category");
    }
  };

  return (
    <CategoryForm
      mode="create"
      handleSubmit={handleSubmit}
      nameInput={nameInput}
      setNameInput={setNameInput}
    />
  );
}
