import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/app/api/_lib/auth";
import { rateLimit } from "@/app/api/_lib/rateLimit";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ cartId: string }> },
) {
  const limited = rateLimit(req);
  if (limited) return limited;

  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  try {
    const { cartId } = await params;
    const itemId = Number(cartId);
    if (!Number.isFinite(itemId)) {
      return NextResponse.json(
        { message: "Invalid cart id" },
        { status: 400 },
      );
    }

    const existing = await prisma.cart.findUnique({ where: { id: itemId } });
    if (!existing) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 },
      );
    }

    await prisma.cart.delete({ where: { id: itemId } });
    return NextResponse.json({ id: itemId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
