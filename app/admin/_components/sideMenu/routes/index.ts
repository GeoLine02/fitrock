import { Filter, LayoutDashboard, Package } from "lucide-react";

export const routes = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    subRoutes: [],
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
    subRoutes: [
      { name: "List", href: "/admin/products/list" },
      { name: "Create", href: "/admin/products/create" },
    ],
  },
  {
    name: "Filters",
    href: "/admin/filters",
    icon: Filter,
    subRoutes: [
      { name: "List", href: "/admin/filters/list" },
      { name: "Create", href: "/admin/filters/create" },
    ],
  },
];
