import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/app/api/_lib/rateLimit";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const limited = rateLimit(req);
  if (limited) return limited;

  try {
    const { productId } = await params;
    const id = Number(productId);
    if (!Number.isFinite(id)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
