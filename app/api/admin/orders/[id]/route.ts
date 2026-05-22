import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { validateBody } from "@/app/api/_lib/validate";
import { orderStatusUpdateSchema } from "@/app/api/admin/_lib/validations";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json(
      { success: false, message: "Invalid order id" },
      { status: 400 },
    );
  }

  try {
    const body = await req.json();
    const validation = validateBody(orderStatusUpdateSchema, body);
    if (!validation.ok) return validation.response;

    const order = await prisma.order.update({
      where: { id: numericId },
      data: { status: validation.data.status },
    });

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
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
