import { GridColDef } from "@mui/x-data-grid";
import CategoriesTable from "./components/CategoriesTable";
import { getCategories } from "./services";

export default async function CategoriesList() {
  const page = 1;
  const limit = 10;

  const { categories, totalRows } = await getCategories(page, limit);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200,
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
      <h1 className="text-3xl font-bold">Categories List</h1>
      <CategoriesTable columns={columns} rows={categories} totalRows={totalRows} />
    </div>
  );
}
