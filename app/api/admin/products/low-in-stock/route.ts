import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { LOW_STOCK_THRESHOLD } from "@/app/api/admin/_lib/validations";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const products = await prisma.product.findMany({
      where: { product_quantity: { lte: LOW_STOCK_THRESHOLD } },
      orderBy: { product_quantity: "asc" },
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
