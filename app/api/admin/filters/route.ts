import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { validateBody } from "@/app/api/_lib/validate";
import {
  filterCreateSchema,
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

    const [filters, totalRows] = await Promise.all([
      prisma.filter.findMany({
        skip,
        take: limit,
        orderBy: { id: "asc" },
      }),
      prisma.filter.count(),
    ]);

    return NextResponse.json(
      { filters, totalRows, currentPage: page },
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
    const validation = validateBody(filterCreateSchema, body);
    if (!validation.ok) return validation.response;

    const filter = await prisma.filter.create({
      data: { weight_amount: validation.data.weightAmount },
    });

    return NextResponse.json({ filter }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
