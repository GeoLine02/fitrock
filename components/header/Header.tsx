import React from "react";
import Logo from "../Logo";
import Button from "../Button";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="
      bg-[url('/Fitrock-assets/imgs/texture.jfif')]
      bg-cover
      w-full
      h-[70px]
      flex
      items-center
      justify-between
      px-12
      text-white
    
      bg-center
      bg-cover
      shadow-md
     
    "
    >
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <nav className="flex gap-10 text-sm uppercase tracking-wide font-medium">
        <span className="cursor-pointer hover:text-orange-400 transition">
          Home
        </span>
        <span className="cursor-pointer hover:text-orange-400 transition">
          Products
        </span>
        <span className="cursor-pointer hover:text-orange-400 transition">
          Company
        </span>
        <span className="cursor-pointer hover:text-orange-400 transition">
          Blog
        </span>
        <span className="cursor-pointer hover:text-orange-400 transition">
          Contacts
        </span>
      </nav>

      <Link href={"/sign-in"}>
        <Button label="Sign in" width="" />
      </Link>
    </header>
  );
}
