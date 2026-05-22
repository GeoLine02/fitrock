"use client";

import Table from "@/app/admin/_components/Table";
import { GridColDef, GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { refetchCategories } from "../services/index.client";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { TableRow } from "@/app/admin/_types/table";

interface CategoriesTableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  totalRows: number;
}

export default function CategoriesTable({
  columns,
  rows,
  totalRows,
}: CategoriesTableProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<readonly GridValidRowModel[]>(
    rows,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const handleChangePage = async (newPage: number, newPerPage: number) => {
    const res = await refetchCategories(newPage, newPerPage);
    if (res.status === 200) {
      setCategories(res.data.categories);
    }
  };

  const handleEdit = (row: TableRow) => {
    router.push(`/admin/categories/update/${row.id}`);
  };

  const handleToggleDeleteModal = (row: TableRow) => {
    setSelectedCategoryId(row.id);
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <div>
      <Table
        columns={columns}
        handleChangePage={handleChangePage}
        handleEdit={handleEdit}
        handleToggleDeleteModal={handleToggleDeleteModal}
        rows={categories}
        totalRows={totalRows}
      />
      {isDeleteModalOpen && (
        <DeleteCategoryModal
          categoryId={selectedCategoryId as number}
          onClose={() => setIsDeleteModalOpen(false)}
          setCategories={setCategories}
        />
      )}
    </div>
  );
}
