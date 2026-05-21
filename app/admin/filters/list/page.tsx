import { GridColDef } from "@mui/x-data-grid";
import FiltersTable from "./components/FiltersTable";
import { getFilters } from "./services";

export default async function FiltersList() {
  const page = 1;
  const limit = 10;

  const filtersData = await getFilters(page, limit);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "weight_amount",
      headerName: "Weight amount",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Filters List</h1>
      <FiltersTable
        columns={columns}
        rows={filtersData.data.filters}
        totalRows={filtersData.data.totalRows}
      />
    </div>
  );
}
