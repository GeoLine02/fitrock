import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { validateBody } from "@/app/api/_lib/validate";
import {
  productCreateSchema,
  ADMIN_PAGE_SIZE,
} from "@/app/api/admin/_lib/validations";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const params = req.nextUrl.searchParams;
    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.max(1, Number(params.get("limit")) || ADMIN_PAGE_SIZE);
    const skip = (page - 1) * limit;

    const [products, totalRows] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { id: "asc" },
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json(
      { products, totalRows, currentPage: page },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const validation = validateBody(productCreateSchema, body);
    if (!validation.ok) return validation.response;

    const { name, description, categoryId, weight, price, discount, quantity } =
      validation.data;

    const product = await prisma.product.create({
      data: {
        product_name: name,
        product_description: description ?? null,
        product_price: price,
        product_discount: discount ?? 0,
        product_quantity: quantity ?? 0,
        product_weight: weight ?? null,
        filter_id: categoryId ?? null,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
