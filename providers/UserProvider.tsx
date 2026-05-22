/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { getUser } from "@/services/user";
import { User } from "@/types/user.type";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextValue = {
  user: User | null;
  setUser: (u: User | null) => void;
  fethUser: () => Promise<User | null>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const fethUser = useCallback(async () => {
    const res = await getUser();
    const next = res?.data ?? null;
    setUser(next);
    return next;
  }, []);

  useEffect(() => {
    if (!user) {
      fethUser();
    }
  }, [user, fethUser]);

  return (
    <UserContext.Provider value={{ user, setUser, fethUser }}>
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
