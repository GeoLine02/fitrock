import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { validateBody } from "@/app/api/_lib/validate";
import {
  categoryCreateSchema,
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

    const [categories, totalRows] = await Promise.all([
      prisma.category.findMany({
        skip,
        take: limit,
        orderBy: { id: "asc" },
      }),
      prisma.category.count(),
    ]);

    return NextResponse.json(
      { categories, totalRows, currentPage: page },
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
    const validation = validateBody(categoryCreateSchema, body);
    if (!validation.ok) return validation.response;

    const category = await prisma.category.create({
      data: { name: validation.data.name },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { success: false, message: "Category name already exists" },
        { status: 409 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
