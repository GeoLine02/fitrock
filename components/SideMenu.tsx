"use client";

import { useUser } from "@/providers/UserProvider";
import classNames from "classnames";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

interface SideMenuProps {
  isSideBarOpen: boolean;
  handleToggleSideMenu: () => void;
  logOut: () => Promise<void>;
}

export default function SideMenu({
  isSideBarOpen,
  handleToggleSideMenu,
  logOut,
}: SideMenuProps) {
  const pathname = usePathname();

  const { user } = useUser();

  const slidingStyles = classNames(
    "absolute top-0 ease-in-out duration-300 transition-all",
    {
      "left-0": isSideBarOpen,
      "-left-full": !isSideBarOpen, // better than left-120
    },
  );

  const linkClasses = (href: string) =>
    classNames(
      "transition-colors p-2",
      pathname === href
        ? "text-black font-bold bg-gray-400"
        : "text-black font-medium hover:text-black",
    );

  return (
    <div className={`${slidingStyles} w-full bg-white h-screen z-50 p-4`}>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Fitrock</h1>
        <X
          size={35}
          onClick={handleToggleSideMenu}
          className="cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-6 text-xl mt-4">
        <Link
          onClick={handleToggleSideMenu}
          className={linkClasses("/")}
          href="/"
        >
          Home
        </Link>

        <Link
          onClick={handleToggleSideMenu}
          className={linkClasses("/contact")}
          href="/contact"
        >
          Contact
        </Link>

        <Link
          onClick={handleToggleSideMenu}
          className={linkClasses("/about-us")}
          href="/about-us"
        >
          About Us
        </Link>
        {user ? (
          <Button onClick={logOut} bgColor="black">
            LogOut
          </Button>
        ) : (
          <Link
            onClick={handleToggleSideMenu}
            className={linkClasses("/sign-in")}
            href="/sign-in"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
