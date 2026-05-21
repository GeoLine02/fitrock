"use client";

import { TableRow } from "@/app/admin/_types/table";
import { Box, Paper } from "@mui/material";
import {
  DataGrid,
  GridActionsColDef,
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DeleteIcon, EditIcon } from "lucide-react";
import { useState } from "react";

interface TableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  totalRows: number;
  handleChangePage: (newPage: number, newPerPage: number) => Promise<void>;
  handleEdit: (row: TableRow) => void;
  handleToggleDeleteModal: (row: TableRow) => void;
}

export default function Table({
  columns,
  rows,
  totalRows,
  handleChangePage,
  handleEdit,
  handleToggleDeleteModal,
}: TableProps) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    const newPage = model.page;
    const newPageSize = model.pageSize;

    setPage(newPage);
    setRowsPerPage(newPageSize);
    handleChangePage(newPage, newPageSize);
  };

  const actionColumn: GridActionsColDef = {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 120,
    getActions: (params) => [
      <GridActionsCellItem
        key={params.id}
        icon={<EditIcon />}
        label="Edit"
        onClick={() => handleEdit(params.row)}
        showInMenu={false}
      />,
      <GridActionsCellItem
        key={params.id}
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => handleToggleDeleteModal(params.row)}
        showInMenu={false}
      />,
    ],
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows}
          columns={[...columns, actionColumn]}
          rowCount={totalRows}
          initialState={{
            pagination: {
              paginationModel: { pageSize: rowsPerPage, page: page - 1 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          onPaginationModelChange={handlePaginationModelChange}
          checkboxSelection
          paginationMode="server"
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-root": {
              minWidth: "100%",
            },
          }}
        />
      </Paper>
    </Box>
  );
}
