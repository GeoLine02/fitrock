"use client";

import FilterForm from "../../components/FilterForm";
import { FormEvent, useState } from "react";
import { createWeigthFilter } from "../services";
import { toast } from "react-toastify";

export default function CreateFilterForm() {
  const [filterInput, setFilterInput] = useState<number>(1);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await createWeigthFilter(filterInput);
      if (res?.status === 201) toast.success("Filter created!");
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <FilterForm
      filterInput={filterInput}
      handleSubmit={handleSubmit}
      mode="create"
      setFilterInput={setFilterInput}
    />
  );
}
