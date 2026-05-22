import { Filter, LayoutDashboard, Package, Tag } from "lucide-react";

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
  {
    name: "Categories",
    href: "/admin/categories",
    icon: Tag,
    subRoutes: [
      { name: "List", href: "/admin/categories/list" },
      { name: "Create", href: "/admin/categories/create" },
    ],
  },
];
