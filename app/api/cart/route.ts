import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/app/api/_lib/auth";
import { validateBody } from "@/app/api/_lib/validate";
import { addToCartSchema } from "@/app/api/_lib/validations";
import { rateLimit } from "@/app/api/_lib/rateLimit";

export async function GET(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;

  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  try {
    const cartItems = await prisma.cart.findMany({
      where: { user_id: auth.user.id },
      include: { product: true },
    });
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;

  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const validation = validateBody(addToCartSchema, body);
    if (!validation.ok) return validation.response;

    const { productId, userId, productQuantity } = validation.data;

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existingProduct) {
      return NextResponse.json(
        { type: "PROUDUCT_NOT_FOUND", message: "Product not found" },
        { status: 404 },
      );
    }

    const existingCartItem = await prisma.cart.findFirst({
      where: { product_id: productId, user_id: userId },
    });
    if (existingCartItem) {
      return NextResponse.json(
        { type: "ALREADY_IN_CART", message: "This product is already in cart" },
        { status: 400 },
      );
    }

    const addedItem = await prisma.cart.create({
      data: {
        product_id: productId,
        product_quantity: productQuantity,
        user_id: userId,
      },
    });

    return NextResponse.json(addedItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}
