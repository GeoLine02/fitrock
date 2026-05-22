import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  blobKeyFor,
  getProductImagesStore,
  publicUrlForBlobKey,
} from "@/lib/productImages";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const form = await req.formData();
    const productIdRaw = form.get("productId");
    const productId = Number(productIdRaw);
    if (!Number.isFinite(productId) || productId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid productId" },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    const files = form.getAll("files").filter((f): f is File => f instanceof File);
    if (files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files provided" },
        { status: 400 },
      );
    }

    for (const file of files) {
      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        return NextResponse.json(
          { success: false, message: `Unsupported file type: ${file.type}` },
          { status: 400 },
        );
      }
      if (file.size > MAX_IMAGE_BYTES) {
        return NextResponse.json(
          { success: false, message: `File exceeds ${MAX_IMAGE_BYTES} bytes` },
          { status: 400 },
        );
      }
    }

    const store = getProductImagesStore();
    const existingMax = await prisma.productImage.aggregate({
      where: { product_id: productId },
      _max: { sort_order: true },
    });
    let nextSortOrder = (existingMax._max.sort_order ?? -1) + 1;

    const created = [] as {
      id: number;
      blob_key: string;
      sort_order: number;
      url: string;
    }[];

    for (const file of files) {
      const blobKey = blobKeyFor(productId, file.name);
      const arrayBuffer = await file.arrayBuffer();
      await store.set(blobKey, arrayBuffer, {
        metadata: { contentType: file.type, originalName: file.name },
      });

      const row = await prisma.productImage.create({
        data: {
          product_id: productId,
          blob_key: blobKey,
          sort_order: nextSortOrder,
        },
      });
      created.push({
        id: row.id,
        blob_key: row.blob_key,
        sort_order: row.sort_order,
        url: publicUrlForBlobKey(row.blob_key),
      });
      nextSortOrder += 1;
    }

    return NextResponse.json({ images: created }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
