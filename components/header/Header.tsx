import React from "react";
import Logo from "../Logo";
import Button from "../Button";

import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" w-full  py-4 flex items-center justify-between px-12 text-black shadow-md">
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <nav className="flex items-center gap-10 text-sm uppercase tracking-wide font-medium">
        <span className="cursor-pointer hover:text-gray-400 transition">
          Home
        </span>
        <span className="cursor-pointer hover:text-gray-400 transition">
          Shop
        </span>
        <span className="cursor-pointer hover:text-gray-400 transition">
          Contact
        </span>
        <Search />
        <ShoppingCart />
        <Link href={"/sign-in"}>
          <Button bgColor="black">Sign In</Button>
        </Link>
      </nav>
    </header>
  );
}
