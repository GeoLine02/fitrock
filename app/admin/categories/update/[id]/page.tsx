import { ToastContainer } from "react-toastify";
import { getCategory } from "../../list/services";
import UpdateCategoryForm from "./components/UpdateCategoryForm";

interface UpdateCategoryProps {
  params: Promise<{ id: number }>;
}

export default async function UpdateCategory({ params }: UpdateCategoryProps) {
  const { id } = await params;
  const categoryData = await getCategory(Number(id));

  return (
    <div>
      <UpdateCategoryForm categoryData={categoryData} />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
