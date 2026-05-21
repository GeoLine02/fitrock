import { LucideIcon } from "lucide-react";

interface CountCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
}

export default function CountCard({
  title,
  count,
  icon: Icon,
}: CountCardProps) {
  return (
    <div className="border-2 border-gray-200 rounded-xl p-4 w-full space-y-2 bg-white shadow-lg">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex gap-2 items-center">
        <Icon size={30} />
        <span className="text-xl font-bold">{count}</span>
      </div>
    </div>
  );
}
