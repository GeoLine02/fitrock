"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFullBleed =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  if (isFullBleed) {
    return <>{children}</>;
  }

  return <main className="container mx-auto">{children}</main>;
}
