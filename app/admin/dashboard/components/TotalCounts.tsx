import CountCard from "@/app/admin/_components/ui/CountCard";
import { Coins, Package, User } from "lucide-react";

interface TotalCountsProps {
  userCount: number;
  productsCount: number;
}

export default function TotalCounts({
  userCount,
  productsCount,
}: TotalCountsProps) {
  return (
    <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
      <CountCard icon={User} count={userCount} title="Users" />
      <CountCard icon={Package} count={productsCount} title="Products" />
      <CountCard icon={Coins} count={1000} title="Revenue" />
    </div>
  );
}
