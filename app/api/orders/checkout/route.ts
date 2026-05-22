import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/app/api/_lib/auth";
import { validateBody } from "@/app/api/_lib/validate";
import { checkoutSchema } from "@/app/api/_lib/validations";
import { rateLimit } from "@/app/api/_lib/rateLimit";

function discountedUnitPrice(price: number, discountPct: number | null) {
  if (!discountPct || discountPct <= 0) return price;
  return Math.round(price - (price * discountPct) / 100);
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;

  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json().catch(() => ({}));
    const validation = validateBody(checkoutSchema, body);
    if (!validation.ok) return validation.response;

    const userId = auth.user.id;
    const targetIds = validation.data.cartItemIds;

    const cartItems = await prisma.cart.findMany({
      where: {
        user_id: userId,
        ...(targetIds && targetIds.length > 0 ? { id: { in: targetIds } } : {}),
      },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 },
      );
    }

    const items = cartItems.map((c) => {
      const unit = discountedUnitPrice(
        c.product.product_price,
        c.product.product_discount,
      );
      return {
        product_id: c.product_id,
        product_quantity: c.product_quantity,
        unit_price: unit,
      };
    });

    const total = items.reduce(
      (sum, i) => sum + i.unit_price * i.product_quantity,
      0,
    );

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          user_id: userId,
          total,
          items: { create: items },
        },
        include: { items: true },
      });

      await tx.cart.deleteMany({
        where: { id: { in: cartItems.map((c) => c.id) } },
      });

      return created;
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
