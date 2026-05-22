"use client";

import { FormInput } from "@/app/admin/products/create/components";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

interface CategoryFormProps {
  mode: "create" | "update";
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  nameInput: string;
  setNameInput: Dispatch<SetStateAction<string>>;
}

export default function CategoryForm({
  mode,
  handleSubmit,
  nameInput,
  setNameInput,
}: CategoryFormProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">
        {mode === "create" ? "Create Category" : "Update Category"}
      </h1>

      <div className="flex gap-4 items-end">
        <div className="flex flex-col gap-1 justify-end">
          <FormInput
            label="Category Name"
            id="name"
            name="name"
            onChange={onChange}
            value={nameInput}
            type="text"
            className="max-w-80"
          />
        </div>
        <button
          type="submit"
          className=" font-medium text-white bg-black rounded-lg px-6 py-2.5 mb-1"
        >
          {mode === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
}
