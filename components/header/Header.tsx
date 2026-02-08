"use client";

import Logo from "../Logo";
import Button from "../Button";

import { Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SideMenu from "../SideMenu";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleToggleSideMenu = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const pathName = usePathname();

  if (pathName.startsWith("/sign-in") || pathName.startsWith("/sign-up"))
    return null;

  return (
    <header className=" w-full border-r-0 border-l-0 py-2 lg:py-4 flex items-center justify-between px-4 lg:px-12 text-black shadow-md">
      {/* Logo */}
      <Link href={"/"}>
        <Logo />
      </Link>

      <nav className="items-center gap-10 text-sm uppercase tracking-wide font-medium hidden md:flex">
        <Link
          href={"/"}
          className="cursor-pointer hover:text-gray-400 transition"
        >
          Home
        </Link>
        <Link
          href={"/products"}
          className="cursor-pointer hover:text-gray-400 transition"
        >
          Prouducts
        </Link>
        <Link
          href={"/contact-us"}
          className="cursor-pointer hover:text-gray-400 transition"
        >
          Contact Us
        </Link>
        <Link
          href={"/about-us"}
          className="cursor-pointer hover:text-gray-400 transition"
        >
          About Us
        </Link>
      </nav>
      <div className="flex gap-6 items-center">
        <Search className="cursor-pointer hover:text-gray-400 transition" />
        <Link href={"/cart"}>
          <ShoppingCart className="cursor-pointer hover:text-gray-400 transition" />
        </Link>
        <span className="lg:hidden" onClick={handleToggleSideMenu}>
          <Menu />
        </span>
        <Link className="hidden lg:block" href={"/sign-in"}>
          <Button bgColor="black">Sign In</Button>
        </Link>
      </div>
      <SideMenu
        handleToggleSideMenu={handleToggleSideMenu}
        isSideBarOpen={isSideBarOpen}
      />
    </header>
  );
}
