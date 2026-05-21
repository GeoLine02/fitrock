import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { validateBody } from "@/app/api/_lib/validate";
import { productUpdateSchema } from "@/app/api/admin/_lib/validations";

type RouteContext = { params: Promise<{ id: string }> };

async function parseId(context: RouteContext) {
  const { id } = await context.params;
  const numeric = Number(id);
  return Number.isFinite(numeric) ? numeric : null;
}

export async function GET(_req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const id = await parseId(context);
  if (id === null) {
    return NextResponse.json(
      { success: false, message: "Invalid product id" },
      { status: 400 },
    );
  }

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const id = await parseId(context);
  if (id === null) {
    return NextResponse.json(
      { success: false, message: "Invalid product id" },
      { status: 400 },
    );
  }

  try {
    const body = await req.json();
    const validation = validateBody(productUpdateSchema, body);
    if (!validation.ok) return validation.response;

    const data: Prisma.ProductUpdateInput = {};
    const v = validation.data;
    if (v.name !== undefined) data.product_name = v.name;
    if (v.description !== undefined) data.product_description = v.description;
    if (v.price !== undefined) data.product_price = v.price;
    if (v.discount !== undefined) data.product_discount = v.discount;
    if (v.quantity !== undefined) data.product_quantity = v.quantity;
    if (v.weight !== undefined) data.product_weight = v.weight;
    if (v.categoryId !== undefined) {
      data.filter =
        v.categoryId === null
          ? { disconnect: true }
          : { connect: { id: v.categoryId } };
    }

    const product = await prisma.product.update({ where: { id }, data });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const id = await parseId(context);
  if (id === null) {
    return NextResponse.json(
      { success: false, message: "Invalid product id" },
      { status: 400 },
    );
  }

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
