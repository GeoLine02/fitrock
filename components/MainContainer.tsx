"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return <main className="container mx-auto">{children}</main>;
}
