import { ToastContainer } from "react-toastify";
import CreateCategoryForm from "./components/CreateCategoryForm";

export default async function AddCategory() {
  return (
    <div>
      <CreateCategoryForm />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
