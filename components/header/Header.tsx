"use client";

import Logo from "../Logo";
import Button from "../Button";

import { Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideMenu from "../SideMenu";
import { usePathname } from "next/navigation";
import { useUser } from "@/providers/UserProvider";
import { logOut } from "@/services/user";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/about-us", label: "About Us" },
];

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleToggleSideMenu = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const pathName = usePathname();

  const { user, setUser } = useUser();
  const cartCount = useSelector(
    (state: RootState) => state.cartReducer.cart.length,
  );

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (
    pathName.startsWith("/sign-in") ||
    pathName.startsWith("/sign-up") ||
    pathName.startsWith("/admin")
  )
    return null;

  const isActive = (href: string) =>
    href === "/" ? pathName === "/" : pathName.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 w-full text-black transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-12 lg:py-4">
        <Link href={"/"} aria-label="Fitrock home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-wide md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-customOrange ${
                  active ? "text-customOrange" : "text-neutral-700"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-customOrange transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            aria-label="Search"
            className="rounded-full p-1.5 text-neutral-700 transition-colors hover:bg-gray-100 hover:text-customOrange"
          >
            <Search size={20} />
          </button>

          <Link
            href={"/cart"}
            aria-label="Cart"
            className="relative rounded-full p-1.5 text-neutral-700 transition-colors hover:bg-gray-100 hover:text-customOrange"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-customOrange px-1 text-[10px] font-bold leading-none text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <Button
              onClick={handleLogout}
              classname="hidden lg:inline-flex"
              bgColor="black"
            >
              Sign Out
            </Button>
          ) : (
            <Link className="hidden lg:block" href={"/sign-in"}>
              <Button bgColor="black">Sign In</Button>
            </Link>
          )}

          <button
            aria-label="Open menu"
            className="rounded-md p-1 text-neutral-700 transition-colors hover:bg-gray-100 hover:text-customOrange md:hidden"
            onClick={handleToggleSideMenu}
          >
            <Menu />
          </button>
        </div>

        <SideMenu
          handleToggleSideMenu={handleToggleSideMenu}
          isSideBarOpen={isSideBarOpen}
          logOut={logOut}
        />
      </div>
    </header>
  );
}
