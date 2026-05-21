"use client";

import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Route } from "@/app/admin/_types/sideMenu";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NavItemProps {
  route: Route;
  isOpen: boolean;
}

export default function NavItem({ route, isOpen }: NavItemProps) {
  const [collapsed, setCollapsed] = useState(true);

  const hasSubRoutes = route.subRoutes.length > 0;
  const firstHref = hasSubRoutes ? route.subRoutes[0].href : route.href;
  const Icon = route.icon;

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubRoutes) {
      if (isOpen) {
        e.preventDefault();
        setCollapsed(!collapsed);
      }
    }
  };

  return (
    <div>
      <Link
        href={hasSubRoutes && !isOpen ? firstHref : route.href}
        className={classNames(
          "flex items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded",
          { "justify-center": !isOpen },
        )}
        onClick={handleClick}
      >
        <Icon className="w-5 h-5" />
        {isOpen && <span className="ml-3">{route.name}</span>}

        {isOpen && hasSubRoutes && (
          <span className="ml-auto">
            {collapsed ? <ChevronDown /> : <ChevronUp />}
          </span>
        )}
      </Link>

      {hasSubRoutes && !collapsed && isOpen && (
        <div className="ml-8 mt-1 flex flex-col space-y-1">
          {route.subRoutes.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="text-sm p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
