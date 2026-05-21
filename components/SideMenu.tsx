"use client";

import { useUser } from "@/providers/UserProvider";
import classNames from "classnames";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Button from "./Button";

interface SideMenuProps {
  isSideBarOpen: boolean;
  handleToggleSideMenu: () => void;
  logOut: () => Promise<void>;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact-us", label: "Contact" },
  { href: "/about-us", label: "About Us" },
];

export default function SideMenu({
  isSideBarOpen,
  handleToggleSideMenu,
  logOut,
}: SideMenuProps) {
  const pathname = usePathname();

  const { user, setUser } = useUser();

  useEffect(() => {
    if (isSideBarOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isSideBarOpen]);

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
      handleToggleSideMenu();
    } catch (e) {
      console.log(e);
    }
  };

  const linkClasses = (href: string) =>
    classNames(
      "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
      pathname === href
        ? "bg-customOrange/10 text-customOrange"
        : "text-neutral-800 hover:bg-gray-100 hover:text-customOrange",
    );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleToggleSideMenu}
        aria-hidden={!isSideBarOpen}
        className={classNames(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden",
          isSideBarOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer */}
      <aside
        aria-hidden={!isSideBarOpen}
        className={classNames(
          "fixed top-0 left-0 z-50 h-screen w-72 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden",
          isSideBarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <span className="text-2xl font-bold tracking-tight">Fitrock</span>
          <button
            aria-label="Close menu"
            onClick={handleToggleSideMenu}
            className="rounded-full p-1.5 text-neutral-700 transition-colors hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              onClick={handleToggleSideMenu}
              className={linkClasses(link.href)}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 mt-2 border-t border-gray-100">
          {user ? (
            <Button
              onClick={handleLogout}
              bgColor="black"
              classname="w-full justify-center"
            >
              Sign Out
            </Button>
          ) : (
            <Link
              onClick={handleToggleSideMenu}
              href="/sign-in"
              className="block"
            >
              <Button bgColor="orange" classname="w-full justify-center">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
