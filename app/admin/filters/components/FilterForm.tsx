"use client";

import { FormInput } from "@/app/admin/products/create/components";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

interface FilterFormProps {
  mode: "create" | "update";
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  filterInput: number;
  setFilterInput: Dispatch<SetStateAction<number>>;
}

export default function FilterForm({
  mode,
  handleSubmit,
  filterInput,
  setFilterInput,
}: FilterFormProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(Number(e.target.value));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">
        {mode === "create" ? "Create Filter" : "Update Filter"}{" "}
      </h1>

      <div className="flex gap-4 items-end">
        <div className="flex flex-col gap-1 justify-end">
          <FormInput
            label=" Dumbbell Weight"
            id="weightAmount"
            name="weightAmount"
            onChange={onChange}
            value={filterInput}
            type="number"
            className="max-w-50"
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
