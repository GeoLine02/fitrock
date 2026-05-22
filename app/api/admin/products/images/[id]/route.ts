import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { getProductImagesStore } from "@/lib/productImages";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json(
      { success: false, message: "Invalid image id" },
      { status: 400 },
    );
  }

  try {
    const image = await prisma.productImage.findUnique({
      where: { id: numericId },
    });
    if (!image) {
      return NextResponse.json(
        { success: false, message: "Image not found" },
        { status: 404 },
      );
    }

    const store = getProductImagesStore();
    await store.delete(image.blob_key);
    await prisma.productImage.delete({ where: { id: numericId } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, message: "Image not found" },
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
