import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { validateBody } from "@/app/api/_lib/validate";
import { filterUpdateSchema } from "@/app/api/admin/_lib/validations";

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
      { success: false, message: "Invalid filter id" },
      { status: 400 },
    );
  }

  try {
    const filter = await prisma.filter.findUnique({ where: { id } });
    if (!filter) {
      return NextResponse.json(
        { success: false, message: "Filter not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(filter, { status: 200 });
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
      { success: false, message: "Invalid filter id" },
      { status: 400 },
    );
  }

  try {
    const body = await req.json();
    const validation = validateBody(filterUpdateSchema, body);
    if (!validation.ok) return validation.response;

    const data: Prisma.FilterUpdateInput = {};
    if (validation.data.weightAmount !== undefined) {
      data.weight_amount = validation.data.weightAmount;
    }

    const filter = await prisma.filter.update({ where: { id }, data });
    return NextResponse.json({ filter }, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, message: "Filter not found" },
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
      { success: false, message: "Invalid filter id" },
      { status: 400 },
    );
  }

  try {
    await prisma.filter.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, message: "Filter not found" },
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
