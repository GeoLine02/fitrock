"use client";

import { useState } from "react";
import { refetchProducts } from "../services/index.client";
import Table from "@/app/admin/_components/Table";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import DeleteProductModal from "./DeleteProductModal";
import { TableRow } from "@/app/admin/_types/table";

interface ProductsTableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  totalRows: number;
}

export default function ProductsTable({
  columns,
  rows,
  totalRows,
}: ProductsTableProps) {
  const [products, setProducts] = useState(rows);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const router = useRouter();

  const handleChangePage = async (newPage: number, newPerPage: number) => {
    const res = await refetchProducts(newPage + 1, newPerPage);

    if (res.status === 200) {
      setProducts(res.data.products);
    }
  };

  const handleEdit = (row: TableRow) => {
    router.push(`/admin/products/update/${row.id}`);
  };

  const handleToggleDeleteModal = async (row: TableRow) => {
    setSelectedProductId(row.id);
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <div>
      <Table
        columns={columns}
        rows={products}
        totalRows={totalRows}
        handleChangePage={handleChangePage}
        handleEdit={handleEdit}
        handleToggleDeleteModal={handleToggleDeleteModal}
      />
      {isDeleteModalOpen && (
        <DeleteProductModal
          productId={selectedProductId as number}
          onClose={() => setIsDeleteModalOpen(false)}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}
