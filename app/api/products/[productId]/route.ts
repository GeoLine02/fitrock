import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/app/api/_lib/rateLimit";
import { publicUrlForBlobKey } from "@/lib/productImages";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const limited = rateLimit(req);
  if (limited) return limited;

  try {
    const { productId } = await params;
    const id = Number(productId);
    if (!Number.isFinite(id)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 },
      );
    }

    const found = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sort_order: "asc" } },
      },
    });
    if (!found) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    const { images, ...rest } = found;
    const product = {
      ...rest,
      image_url: images[0] ? publicUrlForBlobKey(images[0].blob_key) : null,
      images: images.map((img) => ({
        id: img.id,
        url: publicUrlForBlobKey(img.blob_key),
      })),
    };

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
