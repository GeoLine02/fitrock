import { NextRequest, NextResponse } from "next/server";
import { getProductImagesStore } from "@/lib/productImages";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ key: string[] }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  const { key } = await context.params;
  if (!key || key.length === 0) {
    return NextResponse.json(
      { success: false, message: "Missing key" },
      { status: 400 },
    );
  }

  const blobKey = key.join("/");

  try {
    const store = getProductImagesStore();
    const result = await store.getWithMetadata(blobKey, { type: "arrayBuffer" });
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Image not found" },
        { status: 404 },
      );
    }

    const contentType =
      (result.metadata?.contentType as string | undefined) ??
      "application/octet-stream";

    return new NextResponse(result.data as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
