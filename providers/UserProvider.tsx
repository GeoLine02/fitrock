"use client";

import { getUser } from "@/services/user";
import { User } from "@/types/user.type";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextValue = {
  user: User | null;
  setUser: (u: User | null) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const handleGetUser = async () => {
      const res = await getUser();

      if (res?.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    };

    handleGetUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}

export default UserProvider;
