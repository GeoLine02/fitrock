import { LucideIcon } from "lucide-react";

export interface SubRoute {
  name: string;
  href: string;
}

export interface Route {
  name: string;
  href: string;
  icon: LucideIcon;
  subRoutes: SubRoute[];
}
