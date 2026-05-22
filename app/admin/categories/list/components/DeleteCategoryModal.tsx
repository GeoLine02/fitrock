"use client";

import { GridValidRowModel } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";
import { deleteCategory } from "../services/index.client";
import Modal from "@/app/admin/_components/ui/Modal";
import { X } from "lucide-react";

interface DeleteCategoryModalProps {
  categoryId: number;
  onClose: () => void;
  setCategories: Dispatch<SetStateAction<readonly GridValidRowModel[]>>;
}

export default function DeleteCategoryModal({
  onClose,
  categoryId,
  setCategories,
}: DeleteCategoryModalProps) {
  const handleDeleteCategory = async () => {
    try {
      const res = await deleteCategory(categoryId);
      if (res.status === 200) {
        setCategories((prev) => prev.filter((c) => c.id !== categoryId));
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal>
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Confirm Deletion</h2>
          <X size={25} className="cursor-pointer" onClick={onClose} />
        </div>
        <p className="mb-6">Are you sure you want to delete this category?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteCategory}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
