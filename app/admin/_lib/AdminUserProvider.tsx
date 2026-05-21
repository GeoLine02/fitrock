"use client";

import adminApi from "./axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
}

interface AdminUserContextType {
  user: AdminUser | null;
  setUser: (user: AdminUser | null) => void;
}

const AdminUserContext = createContext<AdminUserContextType | undefined>(
  undefined,
);

export const AdminUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await adminApi.get("/user/me");
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch admin user", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AdminUserContext.Provider value={{ user, setUser }}>
      {children}
    </AdminUserContext.Provider>
  );
};

export const useAdminUser = () => {
  const context = useContext(AdminUserContext);
  if (!context) {
    throw new Error("useAdminUser must be used inside AdminUserProvider");
  }
  return context;
};
