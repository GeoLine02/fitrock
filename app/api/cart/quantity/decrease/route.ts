import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/app/api/_lib/auth";
import { validateBody } from "@/app/api/_lib/validate";
import { cartItemIdSchema } from "@/app/api/_lib/validations";
import { rateLimit } from "@/app/api/_lib/rateLimit";

export async function PATCH(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;

  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const validation = validateBody(cartItemIdSchema, body);
    if (!validation.ok) return validation.response;

    const { cartItemId } = validation.data;

    const existing = await prisma.cart.findUnique({
      where: { id: cartItemId },
    });
    if (!existing) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 },
      );
    }

    const updated = await prisma.cart.update({
      where: { id: cartItemId },
      data: { product_quantity: existing.product_quantity - 1 },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
