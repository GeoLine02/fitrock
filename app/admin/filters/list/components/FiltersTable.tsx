"use client";

import Table from "@/app/admin/_components/Table";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { refetchFilters } from "../services/index.client";
import { useRouter } from "next/navigation";
import DeleteFilterModal from "./DeleteFilterModal";
import { TableRow } from "@/app/admin/_types/table";

interface FiltersTableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  totalRows: number;
}

export default function FiltersTable({
  columns,
  rows,
  totalRows,
}: FiltersTableProps) {
  const router = useRouter();
  const [filters, setFilters] = useState(rows);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFilterId, setSelectedFilterId] = useState<number | null>(null);

  const handleChangePage = async (newPage: number, newPerPage: number) => {
    const res = await refetchFilters(newPage, newPerPage);
    if (res.status === 200) {
      setFilters(res.data.filters);
    }
  };

  const handleEdit = (row: TableRow) => {
    router.push(`/admin/filters/update/${row.id}`);
  };

  const handleToggleDeleteModal = (row: TableRow) => {
    setSelectedFilterId(row.id);
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <div>
      <Table
        columns={columns}
        handleChangePage={handleChangePage}
        handleEdit={handleEdit}
        handleToggleDeleteModal={handleToggleDeleteModal}
        rows={filters}
        totalRows={totalRows}
      />
      {isDeleteModalOpen && (
        <DeleteFilterModal
          filterId={selectedFilterId as number}
          onClose={() => setIsDeleteModalOpen(false)}
          setFilters={setFilters}
        />
      )}
    </div>
  );
}
