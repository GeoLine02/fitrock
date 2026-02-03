import React from "react";
interface ProductTableProps {
  label: string;
  dec: string;
  price: number;
  quickFeatures: string[];
  id: number;
}
export default function ProductInfo({
  label,
  dec,
  price,
  quickFeatures,
}: ProductTableProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-medium">{label}</h1>
      <p className="text-2xl font-medium">${price}</p>
      <p className="text-gray-500">{dec}</p>
      <h1 className="font-semibold">Quick Features</h1>
      <div>
        {quickFeatures.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </div>
    </div>
  );
}
