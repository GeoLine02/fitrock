import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { getProductsService } from "./services";
import { Product } from "@/app/admin/_types/products";
import ProductsTable from "./components/ProductsTable";

export default async function ProductsList() {
  const page = 1;
  const limit = 10;
  const getAllProducts = await getProductsService(page, limit);
  const allProduct = getAllProducts.data.products as Product[];
  const totalRows = getAllProducts.data.totalRows as number;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product_name",
      headerName: "Product Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "product_description",
      headerName: "Description",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "product_price",
      headerName: "Price ($)",
      type: "number",
      width: 120,
    },
    {
      field: "product_quantity",
      headerName: "Stock",
      type: "number",
      width: 120,
    },
    {
      field: "product_discount",
      headerName: "Discount",
      type: "number",
      width: 120,
    },
    {
      field: "product_weight",
      headerName: "Weight",
      type: "number",
      width: 120,
    },
  ];

  const rows: GridRowsProp = allProduct.map((product: Product) => ({
    id: product.id,
    product_name: product.product_name,
    product_description: product.product_description,
    product_price: product.product_price,
    product_quantity: product.product_quantity,
    product_discount: product.product_discount,
    product_weight: product.product_weight,
  }));

  return (
    <div className="space-y-4 w-full">
      <h1 className="text-3xl font-bold">Products List</h1>
      <ProductsTable totalRows={totalRows} columns={columns} rows={rows} />
    </div>
  );
}
