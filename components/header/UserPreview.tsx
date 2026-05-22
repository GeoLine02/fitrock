"use client";

import { useUser } from "@/providers/UserProvider";
import { User, LogOut, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";

export default function UserPreview() {
  const { user } = useUser();
  const [isOpend, setIsOpend] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMyOrders = () => {
    router.push("/orders");
    setIsOpend(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpend(!isOpend)}
        className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity"
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <User size={24} />
        </div>
        <div>{user ? <span>{user.full_name}</span> : <span>Guest</span>}</div>
      </button>

      {isOpend && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            onClick={handleMyOrders}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <ShoppingBag size={16} />
            <span>My Orders</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 transition-colors text-left border-t border-gray-200 text-red-600"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
